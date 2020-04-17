export interface ChildParentCommunicationProtocol<T> {
  status: number; // 1 for success, -1 for failure
  message: string; // any message
  payload?: T; // anything else to transmit
}
