import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  AppleIcon,
  GoogleIcon,
  MailIcon,
  MessageIcon,
  PasswordIcon,
  ProfileIcon,
} from '@frontend/common/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpContext } from '@frontend/domain/signup-flow/state';
import { Button, FormInputController, Input } from '@frontend/common/ui';
import { accountFormSchema } from '@frontend/domain/signup-flow/schemas/accountFormSchema';

const pageVariants = {
  initial: {
    opacity: 0,
    x: '10vw', // start from the right of the view
  },
  in: {
    opacity: 1,
    x: 0,
  },
};

type AccountFormData = z.infer<typeof accountFormSchema>;

const FORM = {
  name: 'name',
  email: 'email',
  password: 'password',
} as const;

/**
 * Account Options Page
 *
 * Renders at route /signup/account
 */
export const AccountPage = () => {
  const { selectedOptions, handleWritingState } =
    React.useContext(SignUpContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<AccountFormData>({
    resolver: zodResolver(accountFormSchema),
  });

  const watchAllFields = watch();

  React.useEffect(() => {
    handleWritingState();
  }, [handleWritingState, watchAllFields]);

  const onSubmit = (data: AccountFormData) => {
    alert(
      JSON.stringify(selectedOptions) + ' =========== ' + JSON.stringify(data),
    );
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      variants={pageVariants}
      transition={{ type: 'tween', duration: 0.45 }}
      className="flex h-full w-full flex-col items-center px-4 pt-14"
    >
      <div className="flex w-full flex-col transition-all sm:w-[424px]">
        <div className="flex w-full flex-col gap-4">
          <Button
            variant="outline"
            className="h-[52px] w-full border font-semibold"
            startIcon={<GoogleIcon className="h-6 w-6" />}
          >
            Sign up with Google
          </Button>
          <Button
            variant="outline"
            className="h-[52px] w-full border font-semibold"
            startIcon={<AppleIcon className="mb-1 h-6 w-6" />}
          >
            Sign up with Apple
          </Button>
        </div>
        <div className="flex items-center gap-2 py-4">
          <span className="h-[1px] w-full rounded-full bg-gray-200"></span>
          <span className="text-sm font-medium text-secondary-gray">OR</span>
          <span className="h-[1px] w-full rounded-full bg-gray-200"></span>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-4"
        >
          <FormInputController control={control} name={FORM.name}>
            <Input
              id={FORM.name}
              type="text"
              placeholder="Full Name"
              error={errors[FORM.name]?.message}
              iconSrc={
                <ProfileIcon className="h-3.5 w-3.5 text-primary-blue" />
              }
            />
          </FormInputController>
          <FormInputController control={control} name={FORM.email}>
            <Input
              id={FORM.email}
              type="email"
              placeholder="Email Address"
              error={errors[FORM.email]?.message}
              iconSrc={
                <MessageIcon className="h-3.5 w-3.5 align-middle text-primary-blue" />
              }
            />
          </FormInputController>
          <FormInputController control={control} name={FORM.password}>
            <Input
              id={FORM.password}
              type="password"
              placeholder="Password"
              error={errors[FORM.password]?.message}
              iconSrc={
                <PasswordIcon className="h-3.5 w-3.5 text-primary-blue" />
              }
            />
          </FormInputController>
          <Button type="submit" className="w-full">
            Sign up
          </Button>
        </form>
        <div className="mt-4 text-center text-sm text-[#7D889C]">
          Already have an account?{' '}
          <Link className="text-primary-blue" href="/login">
            Log in
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
