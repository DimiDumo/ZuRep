export type SemaphoreSignaturePcd = {
  type: string;
  pcd: string;
};

export type Claim = {
  identityCommitment: string;
  signedMessage: string;
  nullifierHash: string;
};

export type Pcd = {
  type: string;
  id: string;
  claim: Claim;
  proof: string[];
};

export type Cookie = {
  userId: string;
  pcd: Pcd;
};
