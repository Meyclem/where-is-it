export type Thing = {
  id: string;
  label: string;
  loanDate: string;
  borrower: {
    name: string;
    email?: string;
  };
  user: {
    uid: string;
    name: string;
  };
  note?: string;
};
