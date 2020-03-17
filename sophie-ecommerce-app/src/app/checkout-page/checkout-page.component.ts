import { Component, OnInit } from '@angular/core';
import { ProductService, ICart, IUSer, IUSerAddress } from '../shared';
import { PaystackOptions } from 'angular4-paystack';
import { AuthService } from '../user/auth.service';
import {  Router } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit {
  constructor(private productService:ProductService, private fb: FormBuilder, private auth: AuthService, private router: Router) { }
  
  cartItems : ICart[] = [];
  totamt:number = 0;
  currentUser: IUSer;

  states:any[] = [];
  LGA: any[] = [];
  userAddresses: IUSerAddress[] = [];
  isWithNewAddress: boolean = false;

  userAddressForm = this.fb.group({
    first_name: ['',Validators.required],
    last_name: ['',Validators.required],
    phone: ['', [Validators.required, ,  Validators.minLength(11)]],
    address: ['',[Validators.required]],
    address_city: ['',[Validators.required]],
    address_lga: ['',[Validators.required, Validators.minLength(1)]],
    address_state: ['',[Validators.required]]
  })

  options: PaystackOptions;

  ngOnInit() {
    this.currentUser =  this.auth.currentUser;
    this.productService.getCartItems().subscribe(cItems=>{
      this.cartItems = cItems;
      this.sumTotal();

      this.options = {
        amount: Math.ceil(this.totamt),
        email: this.currentUser.email,
        ref: `${Math.ceil(Math.random() * 10e10)}`
      }
    })

    this.productService.getStateLGADetails().subscribe(s=>{
      this.states=<any[]>s.map(s=>s.state).map(st=>{
        const ind = st.name.indexOf(' State')
        st.name = (ind && ind > 0) ? st.name.substring(0, ind) : st.name;
        return st;
      });
    });

    this.productService.getUserAddresses().then((res)=>{
      console.log('Address', res);
      this.userAddresses = <IUSerAddress[]>res.data;
    })
  }

  sumTotal(){
    this.totamt = 0;
    this.cartItems.forEach(item => {
      this.totamt += Number(item.quantity * item.amount);
    });
    console.log('this.totamt', this.totamt)
  }

  paymentInit() {
    console.log('Payment initialized');
  }

  paymentDone(ref: any) {
    // alert('Payment successfull');
    console.log('this.title', ref);
    this.productService.clearCartItems();
    window.location.href = '/shop';
  }

  paymentCancel() {
    console.log('payment failed');
  }

  getAddresses(){
    this.productService.getUserAddresses().then((res)=>{
      console.log('Address', res);
      this.userAddresses = <IUSerAddress[]>res.data;
    })
  }

  getCorrectStateLGA(val){
    console.log('sss', val.target.value);
    const stateName = val.target.value;
    const inpLGA = <HTMLInputElement>document.getElementById('userAddressLGA');
    inpLGA.value = null;
    inpLGA.setAttribute('value', null);
    this.LGA = [];

    if (stateName) {
      const _LGA = this.states.find(s=> s.name == stateName);
      console.log('_L', _LGA);
      this.LGA = (_LGA && _LGA.locals) ? _LGA.locals : [];
      console.log('LGAs', this.LGA);
    } else{
      this.userAddressForm.patchValue({
        address_lga: null
      })
    }
  }

  confirmCorrectLGA(val){
    console.log('sss', val.target.value);
    const stateName = val.target.value;

    if (!stateName)
    return;

    const inLGA = this.LGA.find(l => l.name == stateName);

    console.log('inLGA', inLGA, stateName, this.LGA)

    if (!inLGA) {
      const inpLGA = <HTMLInputElement>document.getElementById('userAddressLGA');
      inpLGA.value = null;
      inpLGA.setAttribute('value', null);
      this.userAddressForm.patchValue({
        address_lga: null
      })
    }
  }

  getState(stateId){
    if (stateId) {
      return this.states.find(s=>s.id == stateId);
    }
  }

  getLGA(state, lgaId){
    if (state && lgaId) {
      return state.locals.find(l=>l.id == lgaId);
    }
  }

  getStateName(stateId){
    if (stateId) {
      const _state =  this.getState(stateId);
      const stateName = (_state && _state.name) ? _state.name  : '';
      return stateName;
    }
  }

  getLgaNameFromState(stateId, lgaId){
    if (stateId && lgaId) {
      const _state =  this.getState(stateId);
      ;
      const _lga = this.getLGA(_state, lgaId);
      const lgaName = (_lga && _lga.name) ? _lga.name  : '';
      return lgaName;
    }
  }

  submitCheckOut(){

  }
}
