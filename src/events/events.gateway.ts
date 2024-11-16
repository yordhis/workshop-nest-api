import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { EventsService } from './events.service';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({ cors:true })
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect{
  constructor(private readonly eventsService: EventsService) { }

  @WebSocketServer() server: Server;

  @SubscribeMessage('msg')
  handleEvent(@MessageBody() data: string): string {
    return data;
  }


  @SubscribeMessage('events')
  handleEventFind(@MessageBody('id') id: number): number {
    // id === messageBody.id
    return id;
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log('Client is connected');
    this.server.emit('msgToClient', "Client is connected");
  }


  handleDisconnect(client: Socket) {
    console.log('Client disconnected');
    this.server.emit('msgToClient', "Client is disconnected");
  }


}
