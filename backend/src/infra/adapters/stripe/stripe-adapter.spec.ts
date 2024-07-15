import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { StripeAdapter } from './stripe-adapter';
import Stripe from 'stripe';

// Mock the 'stripe' module
vi.mock('stripe', async () => {
  const actual = await vi.importActual<typeof Stripe>('stripe');
  return {
    ...actual,
    default: vi.fn().mockImplementation(() => ({
      customers: {
        create: vi.fn(), // Mock the 'create' method for customers
      },
      subscriptions: {
        retrieve: vi.fn(), // Mock the 'retrieve' method for subscriptions
        update: vi.fn(), // Mock the 'update' method for subscriptions
        cancel: vi.fn(), // Mock the 'cancel' method for subscriptions
      },
    })),
  };
});

describe('StripeAdapter', () => {
  // Define variables for the adapter and the mock
  let stripeAdapter: StripeAdapter;
  let stripeMock: {
    customers: {
      create: vi.Mock;
    };
    subscriptions: {
      retrieve: vi.Mock;
      update: vi.Mock;
      cancel: vi.Mock;
    };
  };

  // Setup before each test
  beforeEach(() => {
    // Create a new mock instance of Stripe
    stripeMock = new (Stripe as any)(process.env.STRIPE_KEY_DEV);
    // Pass the mock to the adapter
    stripeAdapter = new StripeAdapter(stripeMock);
  });

  // Clear all mocks after each test
  afterEach(() => {
    vi.clearAllMocks();
  });

  // Test the createCustomer method
  describe('createCustomer', () => {
    it('should create a new customer', async () => {
      const mockCustomer = {
        id: 'cus_123',
        email: 'test@example.com',
        name: 'Test User',
      };
      // Mock the resolved value of the create method
      stripeMock.customers.create.mockResolvedValue(mockCustomer);

      // Call the createCustomer method on the adapter
      const result = await stripeAdapter.createCustomer(
        'test@example.com',
        'Test User',
      );

      // Assert the result matches the mock customer
      expect(result).toEqual(mockCustomer);
      // Assert the create method was called with the correct arguments
      expect(stripeMock.customers.create).toHaveBeenCalledWith({
        email: 'test@example.com',
        name: 'Test User',
      });
    });
  });

  describe('updateSubscription', () => {
    it('should update a subscription', async () => {
      const mockSubscription = {
        id: 'sub_123',
        customer: 'cus_123',
        status: 'active',
        items: {
          data: [
            {
              id: 'item_123',
              price: {
                id: 'price_old',
              },
            },
          ],
        },
      };

      stripeMock.subscriptions.retrieve.mockResolvedValue(mockSubscription);
      stripeMock.subscriptions.update.mockResolvedValue({
        ...mockSubscription,
        items: {
          data: [
            {
              id: 'item_123',
              price: {
                id: 'price_123',
              },
            },
          ],
        },
      });

      const result = await stripeAdapter.updateSubscription({
        subscriptionId: 'sub_123',
        stripeId: 'price_123',
      });

      expect(result).toEqual({
        id: 'sub_123',
        customer: 'cus_123',
        status: 'active',
      });

      expect(stripeMock.subscriptions.retrieve).toHaveBeenCalledWith('sub_123');
      expect(stripeMock.subscriptions.update).toHaveBeenCalledWith('sub_123', {
        items: [{ id: 'item_123', price: 'price_123' }],
        billing_cycle_anchor: 'now',
        trial_end: 'now',
      });
    });
  });

  // Test the cancelSubscription method
  describe('cancelSubscription', () => {
    it('should cancel a subscription', async () => {
      // Mock the resolved value of the cancel method
      stripeMock.subscriptions.cancel.mockResolvedValue({} as any);

      // Call the cancelSubscription method on the adapter
      await stripeAdapter.cancelSubscription('sub_123');

      // Assert the cancel method was called with the correct argument
      expect(stripeMock.subscriptions.cancel).toHaveBeenCalledWith('sub_123');
    });
  });
});
