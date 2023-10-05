export interface MessageType {
  id: string;
  text: string;
  last_updated: string;
}

export interface ChatType {
  id: string;
  name: string;
  last_updated: string;
  messages: MessageType[];
}
