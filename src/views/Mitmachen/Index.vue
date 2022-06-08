<script setup>
import Section from "./Section.vue";
import Input from "@/components/input/Input.vue";
import Textarea from "@/components/input/Textarea.vue";
import Modal from "@/components/modal/Modal.vue";
import { fetchAPI } from "@/App.vue";
</script>
<template>
  <main>
    <Modal :isOpen="showModal" @close="showModal=!showModal" :title="modalTitle" :content="modalContent" :buttons="[]"/>
    <iframe id="dummy" style="display: none; opacity: 0"></iframe>
    <Section :title="[{value: 'Klein aber&nbsp'}, {value: 'fein', isColored: true}]" :isInvert="false" :text="kleinAberFeinText">
      <form action="/ProposeSmallExtra" @submit="submit" target="dummy">
        <Textarea :isInvert="true" label="Text" name="text"/> 
        <Input :isInvert="true" label="Autor (optional)" type="text" name="author" />
        <div class="center margin-vert">
          <button class="btn-focus">Vorschlagen</button>
        </div>
      </form>
    </Section>
    <Section :title="[{value: 'Aufmerksam&nbsp', isColored: true}, {value: 'machen'}]" :isInvert="true" :text="aufmerksamMachenText">
      <form action="/Proposal" @submit="submit" target="dummy">
        <Textarea :isInvert="true" label="Text" name="text" :defaultRows="7"/> 
        <div class="center margin-vert">
          <button class="btn-focus">Senden</button>
        </div>
      </form>
    </Section>
  </main>
</template>
<script>
export default {
  data(){
    return{
      kleinAberFeinText: "Das kleine aber feine Extra ist ein wichtiger Bestandteil der Mails. Durch interessante Fakten, lustige Sprüche oder weise Zitate wird die Email um ein Vielfaches aufgewertet. Deshalb ist es wichtig, dass es stets Nachschub an kleinen Extras gibt... und dafür bist auch DU verantwortlich. Also, suche etwas und schlage es doch vor.",
      aufmerksamMachenText: "Wenn dir etwas auffällt, bspw ein Bug oder unerwartetes Verhalten, dann kannst du es hier melden. Wenn du Verbesserungsvorschläge hast oder gar Ideen für ganz neue Features dann schreib diese bitte auch hier. Durch Feedback kann Kepleraner immer besser werden, also trau dich und schreib etwas (natürlich ganz anonym).",
      showModal: false,
      modalTitle: "",
      modalContent: "",
    }
  },
  methods: {
    submit(e){
      e.preventDefault();
      const action = e.target.attributes["action"].nodeValue
      const formdata = new FormData(e.target);
      fetchAPI(action, {method: "POST", body: formdata})
      .then(res => res.json())
      .then(res => {
        if(res.isSuccess) {
          this.modalTitle = "Erfolg"
          e.target.reset();
        }
        else this.modalTitle = "Fehlschlag"

        this.modalContent = res.message;
        this.showModal = true;
      })
    }
  }
}
</script>
<style lang="scss">
@import "@/styles/variables";
@import "@/styles/components";
@import "@/styles/helper";
main{
  margin-top: 10vh;

  .btn-focus{
    margin: auto;
  }
}
</style>