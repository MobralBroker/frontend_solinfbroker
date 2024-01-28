<template>
  <CHeader position="sticky" class="mb-4">
    <CContainer fluid>
      <CHeaderToggler class="ps-1" @click="$store.commit('toggleSidebar')">
        <CIcon icon="cil-menu" size="lg" />
      </CHeaderToggler>
      <CHeaderBrand class="mx-auto d-lg-none" to="/">
        <CIcon :icon="logo" height="48" alt="Logo" />
      </CHeaderBrand>
      <CHeaderNav class="d-none d-md-flex me-auto">
        <CNavItem>
          <div style="  display: flex; align-items: center;">
            <H5> {{ userProfile.nomeUsuario }}</H5>
          </div>
        </CNavItem>
      </CHeaderNav>
      <CHeaderNav>
        <!-- <CNavItem>
          <CNavLink href="#">
            <CIcon class="mx-2" icon="cil-bell" size="lg" />
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="#">
            <CIcon class="mx-2" icon="cil-list" size="lg" />
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="#">
            <CIcon class="mx-2" icon="cil-envelope-open" size="lg" />
          </CNavLink> -->
        <!-- </CNavItem> -->
        <AppHeaderDropdownAccnt />
      </CHeaderNav>
    </CContainer>
    <CHeaderDivider />
    <CContainer fluid>
      <AppBreadcrumb />
    </CContainer>
  </CHeader>
</template>

<script>
import { CNavItem } from '@coreui/vue'
import AppBreadcrumb from './AppBreadcrumb'
import AppHeaderDropdownAccnt from './AppHeaderDropdownAccnt'
import { logo } from '@/assets/brand/logo'
import service from '@/service/controller'
export default {
  name: 'AppHeader',
  components: {
    AppBreadcrumb,
    AppHeaderDropdownAccnt,
    CNavItem
},
  data() {
    
    return {
          userProfile: {
          },
    }
  },
  methods: {
    async getProfile(){
      const response = await service.getUserProfile();
      console.log(response)
      try{
        this.userProfile = {   
            id: response.id,
            nomeUsuario: response.nomeUsuario,
            saldo: response.saldo,
            email: response.email
        }
        console.log(this.userProfile)
      } catch(error){
        console.log(error)
      }
      
  }
  },

  setup() {
    return {
      logo,
    }
  },
  mounted(){
    this.getProfile();
  }
}
</script>
