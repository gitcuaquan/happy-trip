<script setup lang="ts">
const mail = useMail()

const mailInfo = reactive({
  full_name:"",
  mail:"",
  phone:"",
  subject:"",
  body:""
})
function sendMail() {
  try {
    mail.send({
      from: mailInfo.full_name,
      subject: mailInfo.subject,
      text: `
        Xin chào tôi là ${mailInfo.full_name} tôi cần liên hệ về vấn đề : ${mailInfo.subject}
        ${mailInfo.body}
        Vui lòng liên hệ với tôi thông qua mail: ${mailInfo.mail} | ${mailInfo.phone}
      `,
    })
    useNuxtApp().$toast.success('Gửi liện hệ thành công')
    mailInfo.body = ""
    mailInfo.full_name=""
    mailInfo.mail = ""
    mailInfo.subject = ""
    mailInfo.phone = ""
  } catch (error) {
    console.log(error);
    useNuxtApp().$toast.error('Gửi liện hệ không thành công')
  }
}
</script>

<template>
  <h3 class="text-center text-uppercase">Liên hệ với chúng tôi</h3>
  <div class="row mt-3 g-3">
    <div data-aos="fade-up" class="col-lg-4">
      <div class="form-floating mb-3">
        <input v-model="mailInfo.full_name" type="text" class="form-control" id="floatingInput" placeholder="Họ và Tên">
        <label for="floatingInput">Họ và Tên</label>
      </div>
    </div>
    <div data-aos="fade-up" data-aos-delay="100" class="col-lg-4">
      <div class="form-floating mb-3">
        <input v-model="mailInfo.mail" type="email" class="form-control" id="floatingInput" placeholder="Email ">
        <label for="floatingInput">Email</label>
      </div>
    </div>
    <div data-aos="fade-up" data-aos-delay="110" class="col-lg-4">
      <div class="form-floating mb-3">
        <input v-model="mailInfo.phone" type="text" class="form-control" id="floatingInput" placeholder=" ">
        <label for="floatingInput">Số điện thoại</label>
      </div>
    </div>
    <div data-aos="fade-up" data-aos-delay="130" class="col-12">
      <div class="form-floating mb-3">
        <input type="text" v-model="mailInfo.subject" class="form-control" id="floatingInput" placeholder="Họ và Tên">
        <label for="floatingInput">Tiêu đề liên hệ</label>
      </div>
    </div>
    <div data-aos="fade-up" data-aos-delay="150" class="col-12">
      <div class="form-floating">
            <textarea v-model="mailInfo.body" class="form-control" placeholder="Leave a comment here" id="floatingTextarea2"
                      style="height: 100px"></textarea>
        <label for="floatingTextarea2">Nội dung</label>
      </div>
    </div>
    <div data-aos="fade-up" data-aos-delay="200">
      <button @click="sendMail" class="btn btn-dark">
        Gửi Liên Hệ
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>