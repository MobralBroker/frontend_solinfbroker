<template>
  <CDropdown placement="bottom-end" variant="nav-item">
    <CDropdownToggle class="py-0 pe-0" :caret="false">
      <CAvatar :src="avatar" size="md" />
    </CDropdownToggle>
    <CDropdownMenu class="pt-0">
      <CDropdownHeader
        component="h6"
        class="bg-body-secondary text-body-secondary fw-semibold mb-2 rounded-top"
      >
        Conta
      </CDropdownHeader>

      <CDropdownItem>
        <CIcon icon="cil-envelope-open" /> Messages
        <CBadge color="success" class="ms-auto">{{ itemsCount }}</CBadge>
      </CDropdownItem>
      
     
      <CDropdownItem>
        <CIcon icon="cil-user" /> Profile
      </CDropdownItem>
      <CDropdownItem>
        <CIcon icon="cil-settings" /> Settings
      </CDropdownItem>
      <CDropdownItem>
        <CIcon icon="cil-dollar" /> Payments
        <CBadge color="secondary" class="ms-auto">{{ itemsCount }}</CBadge>
      </CDropdownItem>
      <CDropdownDivider />

      <CDropdownItem>
        <CIcon icon="cil-lock-locked"  Logout />
        <a class="btn" @click="logOutUser" >Logout</a>
      </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
</template>

<script>
import avatar from '@/assets/img/logo.png'
import swal from 'sweetalert';

export default {
  name: 'AppHeaderDropdownAccnt',
  setup() {
    return {
      avatar: avatar,
      itemsCount: 42,
    }
  },

  methods:{
    logOutUser(){
                swal({
                    title: 'Você quer mesmo sair T.T ?',
                    icon: 'warning',
                    buttons: true,
                    dangerMode: true
                    })
                    .then((result) => {
                            if (result) {
                                swal('Saindo da broker', 'Retornado ao login', 'success');
                                localStorage.removeItem('token')
                                localStorage.removeItem('userMail');

                                this.$router.push('/')
                                
                            } else {
                                swal('Cancelado', 'Cotinuar no broker', 'info');
                            }
                    });
                    
            }
  }
}
</script>
