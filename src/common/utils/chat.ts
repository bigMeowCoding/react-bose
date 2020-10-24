export function getChatId(userId: string, targetId: string): string {
  if (!userId || !targetId) {
    return "";
  }
  return [userId, targetId].sort().join("_");
}
