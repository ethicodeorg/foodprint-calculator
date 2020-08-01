export function extractUser(user) {
  if (!user) return;
  // take only needed user fields to avoid sensitive ones (such as password)
  const { _id, name, email, type, status, subscription, homepage, verifiedAt } = user;
  return {
    _id,
    name,
    email,
    type,
    status,
    subscription,
    homepage,
    verifiedAt,
  };
}
