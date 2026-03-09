export function queueMescrollFinish(callback: () => void): Promise<void> {
  return Promise.resolve().then(() => {
    callback();
  });
}
