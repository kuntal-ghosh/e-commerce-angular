import { Component, OnInit } from '@angular/core';
import { ResponseModel, User } from '../../../../models/user.interface';
import { UserService } from '../../../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data: ResponseModel) => {
      console.log(data);
      this.users = data.data;
    });
  }

}
