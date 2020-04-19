import {Component, OnInit} from '@angular/core';
import {Route, Router} from "@angular/router";
import {BookService} from "../../service/book.service";
import {Alert} from "selenium-webdriver";
import {NgxXml2jsonService} from "ngx-xml2json";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  constructor(private route: Router, private bookService: BookService) {
  }

  private items: any;
  private itemCode;
  private itemCategory = "Select Item Category";
  private title;
  private author;
  private publisher;
  private year;
  private bookCatagory = "Select Category";
  private price;
  private isbn;
  private floor;
  private cupBoard;
  private stock;
  private item: any;
  private filterCategory = "";
  private filterItemCategory = "";
  private filterItemsArr: any;


  private js2xmlparser;

  ngOnInit() {
    if (localStorage.getItem("logged") != "true") {

      this.route.navigate([""])
    }

    this.getAllBooks();

    this.js2xmlparser  = require("js2xmlparser");
  }


  public getAllBooks() {
    this.bookService.getAllBooks().subscribe(result => {
      this.items = result;
    })
  }

  public saveItem(itemForm) {

    var item = itemForm.value;
    var xml = this.js2xmlparser.parse("ItemDTO",item);
    console.log(xml);

    this.bookService.saveItem(xml).subscribe(result => {
      if (result == true) {
        this.getAllBooks();
        this.clear();
        alert("Item Added");


      }
    })

  }

  public findById() {
    this.bookService.findById(this.itemCode).subscribe(result => {
      if (result == "") {
        alert("No Item Found ! ");
        return;
      }
      this.item = result;
      this.itemCode = result["itemCode"];
      this.itemCategory = result["itemCategory"];
      this.author = result["author"];
      this.publisher = result["publisher"];
      this.year = result["year"];
      this.bookCatagory = result["bookCatagory"];
      this.price = result["price"];
      this.isbn = result["isbn"];
      this.title = result["title"];
      this.floor=result["floor"];
      this.cupBoard=result["cupBoard"];
      this.stock=result["stock"]




    })

  }

  public updateItem(itemForm) {
    this.bookService.updateItem(this.itemCode, itemForm.value).subscribe(result => {
      if (result == true) {
        this.getAllBooks();
        this.clear();
        alert("Item Updated ! ");


      }
    })
  }

  public deleteItem() {
    if (confirm('Are you sure you want to delete this item?')) {

      this.bookService.deleteItem(this.itemCode).subscribe(result => {
        if (result == true) {
          this.getAllBooks();
          this.clear();
          alert("Item Deleted");
        }
      })
    } else {
      // Do nothing!
    }
  }


  public tableClicked(itemCode) {

    this.itemCode = itemCode;
    this.findById()
  }


  public filterItems() {

    if (this.filterCategory == "") {
      if (this.filterItemCategory == "All Items") {
        this.getAllBooks();
        return;
      }
      this.bookService.ByItemCategory(this.filterItemCategory).subscribe(result => {
        this.items = result;
      })
    } else if (this.filterItemCategory == "") {
      if (this.filterCategory == "All Categories") {
        this.getAllBooks();
        return;
      }
      this.bookService.byCategory(this.filterCategory).subscribe(result => {
        this.items = result;
      })
    }


    else if (this.filterCategory != "" && this.filterItemCategory != "") {

      if (this.filterCategory == "All Categories" && this.filterItemCategory == "All Items") {
        this.getAllBooks();
        return;
      }
      if (this.filterCategory == "All Categories" && this.filterItemCategory != "All Items") {
        console.log("HERE all Items")
        this.bookService.ByItemCategory(this.filterItemCategory).subscribe(result => {
          this.items = result;
          return;
        })
      } else if (this.filterItemCategory == "All Items" && this.filterCategory != "All Categories") {

        this.bookService.byCategory(this.filterCategory).subscribe(result => {

          this.items = result;
          return;
        })
      } else {
        this.bookService.byCategoryandItemCategory(this.filterCategory, this.filterItemCategory).subscribe(result => {
          this.items = result;
        })
      }
    }


    // console.log(this.filterItemsArr)
    // console.log(this.FilterItemcategory)
  }

  changeCategory(itemCode, category) {

    console.log("change")
    if (category == "Public") {
      this.bookService.changeCategory(itemCode, "Rare").subscribe(result => {


        this.items.forEach(item => {
          if (item["itemCode"] == itemCode) {
            item["bookCatagory"] = "Rare";
          }
        })
      })

    } else {
      this.bookService.changeCategory(itemCode, "Public").subscribe(res => {
        this.items.forEach(item => {
          if (item["itemCode"] == itemCode) {
            item["bookCatagory"] = "Public";
          }
        })
      })

    }


  }

  public clear() {
    this.itemCode = "";
    this.itemCategory = "";
    this.author = "";
    this.publisher = "";
    this.year = "";
    this.bookCatagory = "";
    this.price = "";
    this.isbn = "";
    this.title = "";
    this.floor="";
    this.cupBoard=""
    this.stock="";
  }
}
