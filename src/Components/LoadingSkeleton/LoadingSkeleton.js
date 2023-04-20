import { Skeleton, Stack } from "@mui/material";
import React from "react";

export default function LoadingSkeleton() {
  return (
    <Stack spacing={1}>
      <Skeleton variant="rounded" width="100%" height={50} />
      <Skeleton variant="rounded" width="100%" height={50} />
      <Skeleton variant="rounded" width="100%" height={50} />
      <Skeleton variant="rounded" width="100%" height={50} />
      <Skeleton variant="rounded" width="100%" height={50} />
      <Skeleton variant="rounded" width="100%" height={50} />
      <Skeleton variant="rounded" width="100%" height={50} />
      <Skeleton variant="rounded" width="100%" height={50} />
      <Skeleton variant="rounded" width="100%" height={50} />
      <Skeleton variant="rounded" width="100%" height={50} />
    </Stack>
  );
}
