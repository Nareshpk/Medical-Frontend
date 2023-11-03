import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataSharedService {
    
  
	private objectSource = new BehaviorSubject<Object>(Object);
	private searchValue= new BehaviorSubject<Object>(Object);
	private searchItems= new BehaviorSubject<Object>(Object);
	private SearchMenuValues = new BehaviorSubject<Object>(Object);
	private SearchMenuItems = new BehaviorSubject<Object>(Object);
	private isLoadIcon = new BehaviorSubject<boolean>(false);
	private isSideNavShow = new BehaviorSubject<boolean>(false);

	currentMenuObject = this.objectSource.asObservable();
	currentLoaderObject = this.isLoadIcon.asObservable();
	currentSideNavObject = this.isSideNavShow.asObservable();
	currentSearchObject = this. searchValue.asObservable();
	currentSearchItemObject = this. searchItems.asObservable();
	currentSearchMenuObject = this.SearchMenuValues.asObservable();
	currentSearchMenuItemObject = this.SearchMenuItems.asObservable();
	
	

	parentMenuString: any;
	childMenuString: any;
	constructor() {
		this.parentMenuString = sessionStorage.getItem('parentMenuString');
		this.childMenuString = sessionStorage.getItem('childMenuString');
		let object: any = new Object();
		object.parentMenuString = this.parentMenuString;
		object.childMenuString = this.childMenuString;
		this.objectSource.next(object);
	}

	changeMenuAction(object: any) {
		if (object) {
			sessionStorage.setItem('parentMenuString', object.parentMenuString);
			sessionStorage.setItem('childMenuString', object.childMenuString);
			this.objectSource.next(object);
		} else {
			sessionStorage.clear();
			this.objectSource.next("");
		}
	}
	onSearchAction(object: any){
			if(object){
				this.searchValue.next(object);
				this.searchItems.next(object);
			}
	}
	onSearchMenuAction(object: any){
		if(object){
			this.SearchMenuValues.next(object);
		}
	
	}
	onSearchedMenuAction(object: any){
		if(object){
			this.SearchMenuItems.next(object);
		}
	
	}
	isShowsLoaderIcon(isLoader: boolean = false) {
		this.isLoadIcon.next(isLoader);
	}

	isSideNavAction(isShow: boolean = false) {
		this.isSideNavShow.next(isShow);
	}

	ngOnInit() {

	}


}