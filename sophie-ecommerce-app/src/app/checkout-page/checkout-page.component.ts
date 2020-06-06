import { Component, OnInit } from '@angular/core';
import { ProductService, ICart, IUSer, IUSerAddress } from '../shared';
import { PaystackOptions } from 'angular4-paystack';
import { AuthService } from '../user/auth.service';
import {  Router } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgBlockUI, BlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit {
  cartItems: ICart[] = [];
  totamt = 0;
  currentUser: IUSer;

  states: any[] = [];
  LGA: any[] = [];
  userAddresses: IUSerAddress[] = [];
  isWithNewAddress = true;
  showPreloader = true;
  selectedAddress: IUSerAddress;

  userAddressForm = this.fb.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    phone: ['', [Validators.required, ,  Validators.minLength(11)]],
    address: ['', [Validators.required]],
    address_city: ['', [Validators.required]],
    address_lga: ['', [Validators.required, Validators.minLength(1)]],
    address_state: ['', [Validators.required]]
  });

  options: PaystackOptions;
  @BlockUI() blockUI: NgBlockUI;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.currentUser =  this.auth.currentUser;
    this.productService.populateLocalCartItems();
    this.productService.getLocalCartItems().subscribe(cItems => {
      this.cartItems = cItems;
      this.sumTotal();
      // console.log('totl', this.totamt);
      // console.log('cItems', cItems);
      const totamtKobo = this.totamt ? Math.round(this.totamt * 100) : 0;
      this.options = {
        amount: 1000,
        email: this.currentUser.email,
        ref: `${Math.ceil(Math.random() * 10e10)}`
      };
    });

    this.productService.getStateLGADetails().subscribe(s => {
      // tslint:disable-next-line: no-shadowed-variable
      this.states =  s.map(s => s.state).map(st => {
        const ind = st.name.indexOf(' State');
        st.name = (ind && ind > 0) ? st.name.substring(0, ind) : st.name;
        return st;
      }) as any[];
    });

    this.productService.getUserAddresses().then((res) => {
      // console.log('Address', res);
      this.userAddresses =  res.data as IUSerAddress[];
      this.showPreloader = false;

      if (this.userAddresses.length) {
        this.selectedAddress = this.userAddresses[0];
        this.isWithNewAddress = false;
      }
    });
  }

  sumTotal() {
    this.totamt = 0;
    this.cartItems.forEach(item => {
      this.totamt += Number(item.quantity * item.amount);
    });
    // console.log('this.totamt', this.totamt);
  }

  paymentInit() {
    // console.log('Payment initialized');
  }

  paymentInitWithNewAddress() {
    if (this.userAddressForm.valid) {
      // console.log('Payment initialized with new Address', this.userAddressForm.value);
      const form = this.userAddressForm.value;

      const stateId = this.states.find(s => s.name === form.address_state).id;
      const lgaId = this.LGA.find(l => l.name === form.address_lga).id;

      const address: IUSerAddress = {
        id: null,
        first_name: form.first_name,
        last_name: form.last_name,
        phone: form.phone,
        address: form.address,
        city: form.address_city,
        lga_id: lgaId,
        state_id: stateId
      };
      this.productService.addUserAddress(address)
        .then(res => {
          if (res.status === 'success') {
            this.selectedAddress = res.data;
            // console.log(this.selectedAddress);
          }
        });
    } else {
      return;
    }
  }

  paymentDoneWithNewAddress() {
    if (this.userAddressForm.valid) {
      // console.log('Payment initialized with new Address', this.userAddressForm.value);
      const form = this.userAddressForm.value;

      const stateId = this.states.find(s => s.name === form.address_state).id;
      const lgaId = this.LGA.find(l => l.name === form.address_lga).id;

      const address: IUSerAddress = {
        id: null,
        first_name: form.first_name,
        last_name: form.last_name,
        phone: form.phone,
        address: form.address,
        city: form.address_city,
        lga_id: lgaId,
        state_id: stateId
      };
      this.blockUI.start('Please wait...');
      this.productService.addUserAddress(address)
        .then(res => {
          this.blockUI.stop();

          if (res.status === 'success') {
            this.selectedAddress = res.data;
            // console.log(this.selectedAddress);
          } else {
            throw new Error(res);
          }
        })
        .then(() => this.paymentDone())
        .catch(err => {
          Swal.fire('Problems creating new address',
           'Your new address could not be created. Kindly check if it already exist or enter an appropriate address', 'warning');
        });
    } else {
      return;
    }
  }

  paymentDone() {
    // alert('Payment successfull');
    // // console.log('this.title', ref);
    // console.log('this.title', this.selectedAddress.id.toString());
    this.blockUI.start('Processing...');
    this.productService.addUserOrder(this.selectedAddress.id.toString()).then(res => {
      // console.log('ddd', res);
      this.blockUI.stop();
      if (res.status === 'success') {
        // Swal.fire('Order Confirmed', 'Your transaction was successful. A receipt has been sent to your email', 'success').then(() => {
          // this.productService.clearCartItems();
          window.location.href = res.data.data.authorization_url;
        // });
      }
    });
  }

  paymentCancel() {
    // console.log('payment failed');
  }

  showAddNewAddress() {
    this.isWithNewAddress = true;
  }

  getAddresses() {
    this.productService.getUserAddresses().then((res) => {
      // console.log('Address', res);
      this.userAddresses =  res.data as IUSerAddress[];
    });
  }

  getCorrectStateLGA(val) {
    // console.log('sss', val.target.value);
    const stateName = val.target.value;
    const inpLGA =  document.getElementById('userAddressLGA') as HTMLInputElement;
    inpLGA.value = null;
    inpLGA.setAttribute('value', null);
    this.LGA = [];

    if (stateName) {
      const _LGA = this.states.find(s => s.name === stateName);
      // console.log('_L', _LGA);
      this.LGA = (_LGA && _LGA.locals) ? _LGA.locals : [];
      // console.log('LGAs', this.LGA);
    } else {
      this.userAddressForm.patchValue({
        address_lga: null
      });
    }
  }

  confirmCorrectLGA(val) {
    // console.log('sss', val.target.value);
    const stateName = val.target.value;

    if (!stateName) {
    return;
    }

    const inLGA = this.LGA.find(l => l.name === stateName);

    // console.log('inLGA', inLGA, stateName, this.LGA);

    if (!inLGA) {
      const inpLGA =  document.getElementById('userAddressLGA') as HTMLInputElement;
      inpLGA.value = null;
      inpLGA.setAttribute('value', null);
      this.userAddressForm.patchValue({
        address_lga: null
      });
    }
  }

  getState(stateId) {
    if (stateId) {
      return this.states.find(s => s.id === stateId);
    }
  }

  getLGA(state, lgaId) {
    if (state && lgaId) {
      return state.locals.find(l => l.id === lgaId);
    }
  }

  getStateName(stateId) {
    if (stateId) {
      // tslint:disable-next-line: variable-name
      const _state =  this.getState(stateId);
      const stateName = (_state && _state.name) ? _state.name  : '';
      return stateName;
    }
  }

  getLgaNameFromState(stateId, lgaId) {
    if (stateId && lgaId) {
      // tslint:disable-next-line: variable-name
      const _state =  this.getState(stateId);

      // tslint:disable-next-line: variable-name
      const _lga = this.getLGA(_state, lgaId);
      const lgaName = (_lga && _lga.name) ? _lga.name  : '';
      return lgaName;
    }
  }

  checkSelected(e, address: IUSerAddress) {
    const inp = e.target;
    if (inp.checked) {
      this.selectedAddress = address;
      // // console.log(inp, this.selectedAddress);
    }
  }

  cancelForm() {
    this.isWithNewAddress = false;
  }
}
