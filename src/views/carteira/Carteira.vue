<template>
  <div>
  <div>
    <CNav variant="tabs">
      <CNavItem>
        <CNavLink @click="changeTab(0)" :active="activeTab === 0" style="cursor: pointer;">
          Minha Carteira
        </CNavLink>
      </CNavItem>
      <CNavItem>
        <CNavLink @click="changeTab(1)" :active="activeTab === 1" style="cursor: pointer;">
          Minhas Ordens
        </CNavLink>
      </CNavItem>
      <CNavItem>
        <CNavLink @click="changeTab(2)" :active="activeTab === 2" style="cursor: pointer;">
          Minhas Ações
        </CNavLink>
      </CNavItem>
    </CNav>
  </div>

    <CRow>
      <CCol :md="12">
        <CCard class="mb-4">
          <CCol :xs="12" class="mb-4" style="padding: 10px;">
            <CCard>
              <CCardBody style="padding: 30px;">
                <CRow class="mb-3" v-if="activeTab === 0" >
                  <CCard>
                    <CCardBody>
                      <h4>
                        Valor Disponível: <b style="color: rgb(32, 117, 32);">{{userProfile.saldo}}</b>
                      </h4>
                      <h4>
                        Valor Bloqueado: <b style="color: rgb(146, 47, 47);">{{userProfile.saldoBloqueado}}</b>
                      </h4>
                    </CCardBody>
                  </CCard>
                </CRow>
                <CRow class="mb-3" v-if="activeTab === 0">
                  <CCard>
                    <CCardBody>
                      <h4>
                        Operações
                      </h4>
                      <CRow>
                        <CCol :xs="12" :sm="6" :md="4" class="mb-3">
                          <CWidgetStatsF color="success" :padding="false" 
                            :value="'R$ ' + userProfile.saldo">
                            <template #icon >
                                  <input 
                                  id="currencyInput"
                                  v-model="valorDeposito"
                                  @input="updateValueDeposito"
                                  placeholder="R$ 0,00"
                                  class="form-control"
                                  style="width: 120px;"
                                    />
                            </template>
                            <template #value>
                              <div class="text-center d-flex align-items-center">
                                <CButton color="success" shape="rounded-pill" class="custom-btn" @click="check_possibleDeposito"
                            style="color: white; width: 130px;">DEPOSITO</CButton>
                              </div>
                            </template>
                          </CWidgetStatsF>
                      </CCol>
                      </CRow>
                      <CRow>
                        <CCol :xs="12" :sm="6" :md="4" class="mb-3">
                          <CWidgetStatsF color="danger" :padding="false" >
                            <template #icon>
                                  <input 
                                  id="currencyInput"
                                  v-model="valorSaque"
                                  @input="updateValueSaque"
                                  placeholder="R$ 0,00"
                                  class="form-control"
                                  style="width: 120px;"
                                    />
                            </template>
                            <template #value>
                              <div class="text-center d-flex align-items-center">
                                <CButton color="danger" shape="rounded-pill" class="custom-btn" @click="check_possibleSaque"
                            style="color: white;width: 130px;">SAQUE</CButton>
                              </div>
                            </template>
                          </CWidgetStatsF>
                      </CCol>
                      </CRow>

                    </CCardBody>
                  </CCard>
                </CRow>
                <CRow v-if="activeTab === 1">
                  <component :is="Ordens"/>
                </CRow>
                <CRow v-if="activeTab === 2">
                  <component :is="Acoes"/>
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
import Ordens from '../ordens/Ordens.vue'
import Acoes from './AcoesCliente.vue'

import { ref } from 'vue';

const activeTab = ref(0);

const changeTab = (index) => {
  activeTab.value = index;
};
</script>

<script>
import service from '../../service/controller';
import swal from 'sweetalert';


export default {
  name: 'Carteira',
  components: {

  },
  data() {

    return {

      userProfile: {
      },
      valorSaque: "R$ 0,00",
      valorSaqueValue: 0,
      valorDeposito: "R$ 0,00",
      valorDepositoValue: 0,
    }
  },
  methods: {
    updateValueDeposito(event) {
      // Remover caracteres não numéricos
      const numericValue = parseFloat(event.target.value.replace(/[^\d]/g, ""));

      // Atualizar o valor bruto
      this.valorDepositoValue = isNaN(numericValue) ? 0 : numericValue;

      // Formatando o valor como moeda brasileira
      this.valorDeposito = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(this.valorDepositoValue / 100);
    },
    updateValueSaque(event) {
      console.log(event)
      // Remover caracteres não numéricos
      const numericValue = parseFloat(event.target.value.replace(/[^\d]/g, ""));

      // Atualizar o valor bruto
      this.valorSaqueValue = isNaN(numericValue) ? 0 : numericValue;

      // Formatando o valor como moeda brasileira
      this.valorSaque = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(this.valorSaqueValue / 100);
    },
    async getProfile() {
      const email = localStorage.getItem('userMail')
      const response = await service.getUserProfile();

      try {
        this.userProfile = {
          id: response.id,
          nomeUsuario: response.nomeUsuario,
          saldo: response.saldo,
          email: response.email,
          saldoBloqueado: response.valorBloqueado
        }
        this.userProfile.saldo = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(response.saldo);

      this.userProfile.saldoBloqueado = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(response.valorBloqueado);

      } catch (error) {
        console.log(error)
      }
    },

    async saque(value) {
      try {
        const response = await service.getSaque(this.userProfile.id, value);
        
        this.userProfile.saldo = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(response.saldo);

        // this.userProfile.saldo = response.saldo;
        this.updateValueDeposito({ target: { value: this.valorDeposito } });
        swal('Sucesso', 'Saque efetuado!', 'success');
      } catch (error) {
        swal('Erro', error.response.data, 'error');
        console.log(error)
      }
    },

    async deposito(value) {

      try {
        const response = await service.getDeposito(this.userProfile.id, value);
        this.userProfile.saldo = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(response.saldo);
        console.log("response.saldo",response.saldo)
        console.log("this.userProfile.saldo",this.userProfile.saldo)

        this.updateValueDeposito({ target: { value: this.valorDeposito } });
        swal('Sucesso', 'Depósito realizado!', 'success');
      } catch (error) {
        swal('Erro', 'Ocorreu um erro ao concluir o depósito! T.T', 'error');
        console.log(error)
      }
    },

    check_possibleSaque() {
      var saque_format = this.valorSaque
      var saque_formatCliente = this.userProfile.saldo

      saque_format = saque_format.replace("R", "");
      saque_format = saque_format.replace("$", "");
      saque_format = saque_format.replace(" ", "");
      saque_format = saque_format.trim();
      do {
        saque_format = saque_format.replace(".", "");
      } while (saque_format.includes("."));

      saque_format = saque_format.replace(",", ".");

      saque_formatCliente = saque_formatCliente.replace("R", "");
      saque_formatCliente = saque_formatCliente.replace("$", "");
      saque_formatCliente = saque_formatCliente.replace(" ", "");
      saque_formatCliente = saque_formatCliente.trim();
      do {
        saque_formatCliente = saque_formatCliente.replace(".", "");
      } while (saque_formatCliente.includes("."));

      saque_formatCliente = saque_formatCliente.replace(",", ".");

      console.log(saque_format)
      console.log(saque_formatCliente)

      if (Number(saque_format) > Number(saque_formatCliente)) {
        swal('Aviso', 'O valor do saque solicitado excede o total da conta.', 'warning');
        return 'Tudo certo, valor não excede o saldo disponível'
      }else if(Number(saque_format) <= Number(saque_formatCliente)){
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
<style scoped>
  .custom-btn {
    display: inline-block;
    margin-left: auto;
    margin-right: auto;
  }
</style>