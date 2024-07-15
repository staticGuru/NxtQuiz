export const mapCancellationReasonData = (data) => {
  return data.map((cancellationReason) => ({
    id: cancellationReason.cancellationReasonId.toString(),
    name: cancellationReason.cancellationReasonName,
    icon: cancellationReason.cancellationReasonIcon,
  }));
};
