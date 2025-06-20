import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { Observable } from 'rxjs';
import { CommonService } from '../../shared/common.service';

@Injectable({
  providedIn: 'root'
})
export class SocketIOService {

  constructor(private commonService: CommonService,) { }

  private socket: any;

  // socket connection ;
socketConnectionEstablish() {
  const loginUserDataString = localStorage.getItem('LoginUserData');

  if (!loginUserDataString) {
    console.error('LoginUserData not found in localStorage');
    return;
  }

  const loginUserData = JSON.parse(loginUserDataString);
  const employeeId = loginUserData?.employeeId;

  if (!employeeId) {
    console.error('Employee ID is missing in LoginUserData');
    return;
  }

  this.socket = io(this.commonService.rootData.socketUrl, {
    query: {
      userId: employeeId
    }
  });

  this.socket.on('socket_Connected', (data: any) => {
    console.log('data', data);
  });
}

  // listner for socket connection

  sendMessage(data:any) {
    this.socket.emit('message', data);
  }


  receiveMessage() {
    let observable = new Observable<any>(observer => {
      this.socket.on('newMessage', (data:any) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });
    return observable
  }

  receiveNotification() {
    let observable = new Observable<any>(observer => {
      this.socket.on('notification', (data:any) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });
    return observable
  }

  getBreakListner() {
    let observable = new Observable<any>(observer => {
      this.socket.on('break', (data:any) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });
    return observable
  }



}
