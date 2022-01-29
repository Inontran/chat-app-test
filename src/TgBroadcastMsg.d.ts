interface TgBroadcastMsg {
  queue: string,
  payload: {
    data: TgMessage[],
  }
}