import { Component, OnInit } from '@angular/core';
import { ProductService, IUSerAddress } from 'src/app/shared';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-my-addresses',
  templateUrl: './my-addresses.component.html',
  styleUrls: ['./my-addresses.component.scss']
})
export class MyAddressesComponent implements OnInit {

  constructor(private productService: ProductService, private fb: FormBuilder) { }

  states: any[] = [];
  LGA: any[] = [];

  userAddresses: IUSerAddress[] = [];

  isCreate =  true;
  showForm =  false;
  showPreloader = true;

  userAddressForm = this.fb.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    phone: ['', [Validators.required, ,  Validators.minLength(11)]],
    address: ['', [Validators.required]],
    address_city: ['', [Validators.required]],
    address_lga: ['', [Validators.required, Validators.minLength(1)]],
    address_state: ['', [Validators.required]]
  });

  @BlockUI() blockUI: NgBlockUI;

  ngOnInit() {
    this.productService.getStateLGADetails().subscribe(s => {
      // tslint:disable-next-line: no-shadowed-variable
      this.states = s.map(s => s.state).map(st => {
        // console.log('st', st);
        const ind = st.name.indexOf(' State');
        st.name = (ind && ind > 0) ? st.name.substring(0, ind) : st.name;
        return st;
      }) as any[];
      // console.log('res0', s);
      // console.log('state', this.states);
    });

    this.productService.getUserAddresses().then((res) => {
      console.log('Address', res);
      this.userAddresses = res.data as IUSerAddress[];
      this.showPreloader = false;
    });
  }

  getAddresses() {
    this.showPreloader = true;
    this.productService.getUserAddresses().then((res) => {
      console.log('Address', res);
      this.userAddresses = res.data as IUSerAddress[];
      this.showPreloader = false;
    });
  }

  getCorrectStateLGA(val) {
    console.log('sss', val.target.value);
    const stateName = val.target.value;
    const inpLGA = document.getElementById('userAddressLGA') as HTMLInputElement;
    inpLGA.value = null;
    inpLGA.setAttribute('value', null);
    this.LGA = [];

    if (stateName) {
      // tslint:disable-next-line: triple-equals
      const _LGA = this.states.find(s => s.name == stateName);
      console.log('_L', _LGA);
      this.LGA = (_LGA && _LGA.locals) ? _LGA.locals : [];
      console.log('LGAs', this.LGA);
    } else {
      this.userAddressForm.patchValue({
        address_lga: null
      });
    }
  }

  confirmCorrectLGA(val) {
    console.log('sss', val.target.value);
    const stateName = val.target.value;

    if (!stateName) {
    return;
    }

    // tslint:disable-next-line: triple-equals
    const inLGA = this.LGA.find(l => l.name == stateName);

    console.log('inLGA', inLGA, stateName, this.LGA);

    if (!inLGA) {
      const inpLGA = document.getElementById('userAddressLGA') as HTMLInputElement;
      inpLGA.value = null;
      inpLGA.setAttribute('value', null);
      this.userAddressForm.patchValue({
        address_lga: null
      });
    }
  }

  getState(stateId) {
    if (stateId) {
      // tslint:disable-next-line: triple-equals
      return this.states.find(s => s.id == stateId);
    }
  }

  getLGA(state, lgaId) {
    if (state && lgaId) {
      // tslint:disable-next-line: triple-equals
      return state.locals.find(l => l.id == lgaId);
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

  editAddress(address: IUSerAddress) {
    if (address) {
      const stateName = this.getStateName(address.state_id);
      const lgaName = this.getLgaNameFromState(address.state_id, address.lga_id);

      this.userAddressForm.patchValue({
        first_name: address.first_name,
        last_name: address.last_name,
        phone: address.phone,
        address: address.address,
        address_city: address.city,
        address_lga: lgaName,
        address_state: stateName
      });

      this.isCreate = false;
      this.showForm = true;
    }
  }

  deleteAddress(address: IUSerAddress) {
    try {
      if (address && address.id) {
        Swal.fire({
          title: 'Deletion Confirmation',
          text: 'Are you sure you want to delete this address?',
          icon: 'question',
          confirmButtonText: 'Yes, Delete',
          showCancelButton: true,
          cancelButtonText: 'No, Cancel.',
          confirmButtonColor: '#dc3545',
          cancelButtonColor: '#28a745'
        }).then((result) => {
          if (result.value) {
            this.blockUI.start();
            this.productService.deleteUserAddress(address).then(res => console.log(res)).then(() => {
            this.blockUI.stop();
            Swal.fire(
                'Deleted!',
                'Address has been updated deleted.',
                'success'
                );
            })
            .then(() => this.getAddresses())
            .catch(err => {
              this.blockUI.stop();
              Swal.fire({
                title: 'Error',
                icon: 'error',
                text: err
              });
            });
          } else if (
            result.dismiss === Swal.DismissReason.cancel
          ) {
            this.blockUI.stop();
            Swal.fire(
              'Cancelled',
              '',
              'info'
            );
          }
        });
      }
    } catch (error) {
      this.blockUI.stop();
      console.error(error);
    }
  }

  resetForm() {
    this.userAddressForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone: ['', [Validators.required, ,  Validators.minLength(11)]],
      address: ['', [Validators.required]],
      address_city: ['', [Validators.required]],
      address_lga: ['', [Validators.required, Validators.minLength(1)]],
      address_state: ['', [Validators.required]]
    });
  }

  showAddForm() {
    this.resetForm();
    this.showForm = true;
  }

  closeForm() {
    this.getAddresses();
    this.resetForm();
    this.showForm = false;
  }

  cancelForm() {
    if (this.userAddressForm.dirty) {
      const res = window.confirm('Do you want to discard address changes?');

      if (res) {
        return this.closeForm();
      }

      return;
    }
    this.closeForm();
  }

  addNewAddress(address: IUSerAddress) {
    try {
      Swal.fire({
        title: 'Confirmation',
        text: 'You want to create a new address?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, Create!',
        cancelButtonText: 'No, cancel!',
      }).then((result) => {
        this.blockUI.start();
        if (result.value) {
          this.productService.addUserAddress(address).then(res => console.log(res)).then(() => {
            this.blockUI.stop();
            Swal.fire(
              'Created!',
              'Address has been created successfully.',
              'success'
              );
          })
          .then(() => this.resetForm())
          .catch(err => {
            this.blockUI.stop();

            Swal.fire({
            title: 'Error',
            icon: 'error',
            text: err
            });
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          this.blockUI.stop();
          Swal.fire(
            'Cancelled',
            '',
            'info'
          );
        }
      });
    } catch (error) {
      this.blockUI.stop();
      console.error(error);
    }
  }

  updateAddress(address: IUSerAddress) {
    try {
      Swal.fire({
        title: 'Confirmation',
        text: 'You want to update this address?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, Update!',
        cancelButtonText: 'No, cancel!',
      }).then((result) => {
        this.blockUI.start();
        if (result.value) {
          this.productService.updateUserAddress(address).then(res => console.log(res)).then(() => {
            this.blockUI.stop();
            Swal.fire(
              'Updated!',
              'Address has been updated successfully.',
              'success'
              );
          })
          .then(() => {
            this.closeForm();
          })
          .catch(err => {
            this.blockUI.stop();
            Swal.fire({
              title: 'Error',
              icon: 'error',
              text: err
            });
          });
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          this.blockUI.stop();
          Swal.fire(
            'Cancelled',
            '',
            'info'
          );
        }
      });
    } catch (error) {
      this.blockUI.stop();
      console.error(error);
    }
  }

  submitAddress(form: FormGroup) {
    try {
      console.log(form.status, form.value);
      // tslint:disable-next-line: triple-equals
      if (form.status.toLowerCase() == 'valid') {
        // tslint:disable-next-line: variable-name
        const _form = form.value;
        // tslint:disable-next-line: variable-name
        const _stateId = this.states.find(s => s.name === _form.address_state).id;
        // tslint:disable-next-line: variable-name
        const _lgaId = this.LGA.find(l => l.name === _form.address_lga).id;

        const address: IUSerAddress = {
          id: null,
          first_name: _form.first_name,
          last_name: _form.last_name,
          phone: _form.phone,
          address: _form.address,
          city: _form.address_city,
          lga_id: _lgaId,
          state_id: _stateId
        };

        console.log('address value', address);

        this.isCreate ? this.addNewAddress(address) : this.updateAddress(address);
      }
    } catch (err) {
      console.error(err);
    }
  }

  canDeactivate() {
    // if the form is dirty
    if (this.userAddressForm.dirty) {
      return window.confirm('Do you want to discard address changes?');
    }

    return true;
  }
}
