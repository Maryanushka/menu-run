import { Component, OnInit, EventEmitter, Input, Output } from "@angular/core";
import { BalanceService } from '../../services/balance.service';
import { StarRatingComponent } from "ng-starrating";

@Component({
  selector: "app-success-page",
  templateUrl: "./success-page.component.html",
  styleUrls: ["./success-page.component.scss"]
})
export class SuccessPageComponent implements OnInit {
  classes: string = "-o";
  tipClasses: string = "unchecked";
  balance: number;
  constructor(private BalanceService: BalanceService) {}
  rating: number;
  itemId: number;
  @Output() ratingClick: EventEmitter<any> = new EventEmitter<any>();
  inputName: string;
  status: boolean = false;

  ngOnInit(): void {
    this.getBalance();
    this.inputName = this.itemId + "_rating";
    // console.log(this.itemId);
  }

  getBalance() {
    let b = this.BalanceService.getbalance();
    if (b > 0) {
      return (this.balance = b);
    } else return (this.balance = 0);
  }

  // onRate(rating: number): void {
    // this.rating = rating;
    // this.ratingClick.emit({
      // itemId: this.itemId
      // rating: rating
    // });
  // }

  changeClasses(e) {
    console.log(e.currentTarget, e.currentTarget.status, e.currentTarget.tipClasses);

    e.currentTarget.status = !e.currentTarget.status;
    if (e.target.status == true) {
      e.currentTarget.tipClasses = "checked";
    } else {
      e.target.tipClasses = "unchecked";
    }
  }
}
