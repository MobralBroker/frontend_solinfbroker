<template>
  <div>


    <CRow>
      <CCol :md="12">
        <CCard class="mb-4">


          <CCardHeader color="danger">Carteira</CCardHeader>
          <CCol :xs="12" class="mb-4">
            <CCard>
              <CCardBody>
                <CRow>
                  <CCol :xs="6">
                    <CCol :xs="10">
                      <CWidgetStatsF color="success" :padding="false" title="DEPOSITAR"
                        :value="'R$ ' + this.userProfile.saldo">
                        <template #icon>
                          <CIcon icon="cil-dollar" size="xl" />
                          <!--<CFormInput type="text" id="text" name="text" placeholder="Valor"  v-model="valorDeposito"/>-->
                          <div>
                            <input type="text" id="text" v-model="valorDeposito" v-maska:[maska_options] data-maska="0.99"
                              data-maska-tokens="0:\d:multiple|9:\d:optional">
                          </div>
                        </template>
                      </CWidgetStatsF>
                      <br>
                      <CButton color="success" shape="rounded-pill" class="px-12" @click="check_possibleDeposito"
                        style="color: white;">DEPOSITO</CButton>
                    </CCol>
                    <br>
                  </CCol>

                  <CCol :xs="6">
                    <CCol :xs="10">
                      <CWidgetStatsF color="danger" :padding="false" title="SACAR"
                        :value="'R$ ' + this.userProfile.saldo">
                        <template #icon>
                          <CIcon icon="cil-dollar" size="xl" />
                          <!--<CFormInput type="text" id="text" name="text" placeholder="Valor" v-model="valorSaque" />-->
                          <div>
                            <input type="text" id="text" v-model="valorSaque" v-maska:[maska_options] data-maska="0.99"
                              data-maska-tokens="0:\d:multiple|9:\d:optional">
                          </div>
                        </template>
                      </CWidgetStatsF>
                      <br>
                      <CButton color="danger" shape="rounded-pill" class="px-12" @click="check_possibleSaque"
                        style="color: white;">SAQUE</CButton>
                    </CCol>
                    <br>
                  </CCol>

                </CRow>

              </CCardBody>
            </CCard>
          </CCol>



        </CCard>
      </CCol>
    </CRow>




  </div>
</template>
<script setup>
import { vMaska } from "maska";
</script>

<script>
import service from '../../service/controller';
import swal from 'sweetalert';

//Valores para v-mask
export const maska_options = {
  preProcess: val => val.includes('R$')
    ? val
      .replace(/[.]/g, ' ')
      .replace(/[,]/g, '.')
      .replace(/[^.0-9]/g, '')
    : val
      .replace(/[^.0-9]/g, ''),
  postProcess: val => {
    if (!val) return ''

    const sub = 3 - (val.includes('.') ? val.length - val.indexOf('.') : 0)

    return Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
      .format(val)
      .slice(0, sub ? -sub : undefined)
  }
}

export default {
  name: 'Dashboard',
  components: {

  },
  data() {

    return {

      userProfile: {
      },
      valorSaque: 0,
      valorDeposito: 0,
    }
  },
  methods: {

    async getProfile() {
      const email = localStorage.getItem('userMail')
      const response = await service.getUserProfile(email);
      try {
        this.userProfile = {
          id: response.id,
          nomeUsuario: response.nomeUsuario,
          saldo: response.saldo,
          email: response.email
        }
        console.log(this.userProfile)
      } catch (error) {
        console.log(error)
      }
    },

    async saque(value) {
      try {
        const response = await service.getSaque(this.userProfile.id, value);
        swal('Sucesso', 'Saque efetuado!', 'success');
      } catch (error) {
        swal('Erro', 'Ocorreu um erro ao efetuar o saque T.T', 'error');
        console.log(error)
      }
    },

    async deposito(value) {
      try {
        const response = await service.getDeposito(this.userProfile.id, value);
        swal('Sucesso', 'Depósito realizado!', 'success');
      } catch (error) {
        swal('Erro', 'Ocorreu um erro ao concluir o depósito! T.T', 'error');
        console.log(error)
      }
    },

    check_possibleSaque() {
      var saque_format = this.valorSaque
      saque_format = saque_format.replace("R", "");
      saque_format = saque_format.replace("$", "");
      saque_format = saque_format.replace(" ", "");
      saque_format = saque_format.trim();
      do {
        saque_format = saque_format.replace(".", "");
      } while (saque_format.includes("."));

      saque_format = saque_format.replace(",", ".");
      console.log(saque_format)
      if (saque_format > this.userProfile.saldo) {
        swal('Aviso', 'O valor do saque pedido excede o total da conta.', 'warning');
        return 'Tudo certo, valor não excede o saldo disponível'
      }else{
        this.saque(saque_format)
      }
    },
    check_possibleDeposito() {
      var dep_format = this.valorDeposito;
      dep_format = dep_format.replace("R", "");
      dep_format = dep_format.replace("$", "");
      dep_format = dep_format.replace(" ", "");
      dep_format = dep_format.trim();
      do {
        dep_format = dep_format.replace(".", "");
      } while (dep_format.includes("."));

      dep_format = dep_format.replace(",", ".");
      this.deposito(dep_format);
      return 'Formatado, enviando para bd';
    },

  },

  /*  FINISH FUNC'S    */

  mounted() {
    this.getProfile();
  },
}
</script>
