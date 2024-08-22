<script setup lang="ts">
  import { Icon } from "@iconify/vue"

  definePageMeta({
    layout: "blank"
  })
  useHead({
    title: "Happy Trip - Dịch Vụ Xe Ghép, Xe Tiện Chuyến Hà Nội - Hải Phòng - Quảng Ninh Giá Rẻ, An Toàn"
  })
  const index = ref(0)
</script>

<template>

  <sec-hero />
  <section class="py-5 my-5">
    <div class="container">
      <div class="row">
        <div class="col-12 mb-5">
          <h2 class="text-center">
            Dịch Vụ Xe Ghép Chuyến Hà Nội - Hải Phòng - Quảng Ninh
          </h2>
        </div>
        <div class="col-lg-4">
          <div class="card bg-light  border-0">
            <img src="/img/ss2/a1.jpg" class="card-img-top" alt="">
            <div class="card-body text-center">
              <a href="tel:+840972970000" class="btn text-white btn-primary">
                Liên Hệ Ngay 0972970000
              </a>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="card bg-light border-0">
            <img src="/img/ss2/a3.jpg" class="card-img-top" alt="">
            <div class="card-body text-center">
              <a href="tel:+840972970000" class="btn text-white btn-primary">
                Liên Hệ Ngay 0972970000
              </a>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="card bg-light border-0">
            <img src="/img/ss2/a3.jpg" class="card-img-top" alt="">
            <div class="card-body text-center">
              <a href="tel:+840972970000" class="btn text-white btn-primary">
                Liên Hệ Ngay 0972970000
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <fontend-func-slide />
  <section id="ghep-xe" class="py-lg-5 my-lg-5">
    <div class="container">
      <div class="row g-4">
        <div class="col-lg-4">
          <div data-aos="fade-up" class="d-flex gap-2 align-items-center">
            <div class="bg-primary text-light justify-content-center rounded d-flex align-items-center  p-4">
              <Icon icon="tdesign:map-safety" style="font-size: 30px" />
            </div>
            <div>
              <h5 class="mb-0">An toàn trên mọi cung đường</h5>
              <p class="fst-italic m-0">
                <small>Mọi chuyến đi đều được HappTrip kiểm duyệt trước khi khởi hành</small>
              </p>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div data-aos="fade-up" data-aos-delay="100" class="d-flex gap-2 align-items-center">
            <div class="bg-primary text-light justify-content-center rounded d-flex align-items-center  p-4">
              <Icon icon="fluent:feed-16-filled" style="font-size: 30px" />
            </div>
            <div>
              <h5 class="mb-0">Chi phí minh bạch</h5>
              <p class="fst-italic m-0">
                <small>Các chi phí đều được niêm yết trên hệ thống và được thông báo trước khởi hành</small>
              </p>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div data-aos="fade-up" data-aos-delay="200" class="d-flex gap-2 align-items-center">
            <div class="bg-primary text-light justify-content-center rounded d-flex align-items-center  p-4">
              <Icon icon="fluent:fast-acceleration-24-regular" style="font-size: 30px" />
            </div>
            <div>
              <h5 class="mb-0">Di chuyển nhanh chóng</h5>
              <p class="fst-italic m-0">
                <small>
                  Di chuyển nhanh hơn xe khách và xe bus thông thường
                </small>
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
  <section class="py-lg-5 my-lg-5">
    <div class="container h-100">
      <div class="row g-3 h-100 align-items-center">
        <div class="col-lg-7">
          <div data-aos="fade-up" class="card p-3  border-0  d-flex flex-column justify-content-end">
            <img src="/img/bg.png" class="w-100">
            <h1 class="text-center text-lg-start">Dịch vụ ghép xe</h1>
            <p class="fst-italic text-center text-lg-start">
              Với sự riêng tư vừa đủ, một chuyến đi an toàn, tiết kiệm, sự thuận tiện đón đưa tận nhà và với ý nghĩa
              lớn hơn là bạn đã góp phần hạn chế áp lực giao thông, giảm khí thải bảo vệ môi trường.
            </p>
          </div>
        </div>
        <div class="col-lg-5">
          <div class="px-3">
            <div data-aos="fade-up" class="btn-group rounded-pill border border-dark overflow-hidden w-100 "
              role="group" aria-label="Basic example">
              <button type="button" data-bs-target="#carousel1" data-bs-slide-to="0"
                :class="`btn  border-0 btn-outline-dark ${index == 0 ? 'active' : ''}`" aria-current="true"
                aria-label="Slide 1">Dành cho khách hàng
              </button>
              <button type="button" data-bs-target="#carousel1"
                :class="`btn border-0  btn-outline-dark ${index == 1 ? 'active' : ''}`" data-bs-slide-to="1"
                aria-label="Slide 2">Dành cho lái xe
              </button>
            </div>
          </div>
          <div id="carousel1" data-aos="fade-up" class="carousel  slide" data-bs-ride="true">
            <div class="carousel-inner">
              <div class="carousel-item p-lg-3  pt-2 active bg-white">
                <div class="card bg-white p-lg-3  pt-2 border-0 shadow-sm">
                  <div class="accordion accordion-flush" id="accordionkhach">
                    <div data-aos="fade-up" class="accordion-item">
                      <h2 class="accordion-header" id="headingOne">
                        <button class="accordion-button fw-bold" type="button" data-bs-toggle="collapse"
                          data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                          An toàn và chất lượng dịch vụ là số 1
                        </button>
                      </h2>
                      <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne"
                        data-bs-parent="#accordionkhach">
                        <div class="accordion-body">
                          Là chuyến đi an toàn bởi 100% các tài xế phải trải qua quy trình kiểm tra sức khoẻ, GPLX, thực
                          hành
                          lái. Toàn bộ phương tiện được bảo dưỡng định kỳ, kiểm tra và đảm bảo vệ sinh dịch tễ, lái xe
                          được sắp
                          xếp chuyến đi từ điều vận sẽ hạn chế được sử dụng điện thoại khi vận hành phương tiện.
                        </div>
                      </div>
                    </div>
                    <div data-aos="fade-up" class="accordion-item">
                      <h2 class="accordion-header" id="headingTwo">
                        <button class="accordion-button fw-bold collapsed" type="button" data-bs-toggle="collapse"
                          data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                          Rõ ràng cước phí trước khi đặt xe
                        </button>
                      </h2>
                      <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
                        data-bs-parent="#accordionkhach">
                        <div class="accordion-body">
                          Mọi hoạt động thanh toán được thống nhất trước khi khởi hành và niêm yết trên hệ thống
                        </div>
                      </div>
                    </div>
                    <div data-aos="fade-up" class="accordion-item">
                      <h2 class="accordion-header" id="headingThree">
                        <button class="accordion-button fw-bold collapsed" type="button" data-bs-toggle="collapse"
                          data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                          Đi chung xe nhưng không chậm.
                        </button>
                      </h2>
                      <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree"
                        data-bs-parent="#accordionkhach">
                        <div class="accordion-body">
                          Với việc áp dụng công nghệ 4.0 và AI vào việc tối ưu tuyến đường theo Phường, Quận giúp thời
                          gian di
                          chuyển tại nội đô giảm xuống không khác nhiều so với bao xe.
                        </div>
                      </div>
                    </div>
                    <div data-aos="fade-up" class="accordion-item">
                      <h2 class="accordion-header" id="heading4">
                        <button class="accordion-button fw-bold collapsed" type="button" data-bs-toggle="collapse"
                          data-bs-target="#collapse4" aria-expanded="false" aria-controls="collapse4">
                          Phương tiện đa dạng và số lượng lớn
                        </button>
                      </h2>
                      <div id="collapse4" class="accordion-collapse collapse" aria-labelledby="heading4"
                        data-bs-parent="#accordionkhach">
                        <div class="accordion-body">
                          Các loại xe từ 5 chỗ, 7 chỗ, bán tải với các hình thức ghép ghế và bao xe sẽ mang đến cho
                          khách hàng
                          đa dạng sự lựa chọn phù hợp với nhu cầu di chuyển.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="carousel-item p-lg-3  pt-2 ">
                <div class="card bg-white p-lg-3  pt-2 border-0 shadow">
                  <div class="accordion accordion-flush" id="accordiontaxe">
                    <div data-aos="fade-up" class="accordion-item">
                      <h2 class="accordion-header" id="headingOne">
                        <button class="accordion-button fw-bold" type="button" data-bs-toggle="collapse"
                          data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                          Gia tăng thu nhập, ổn định cuộc sống
                        </button>
                      </h2>
                      <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne"
                        data-bs-parent="#accordiontaxe">
                        <div class="accordion-body">
                          Happy Trip sẽ sắp xếp khách hàng trên các xe, tối ưu cung đường di chuyển theo phường quận do
                          đó giảm được các chi phí như: nhiên liệu, thời gian di chuyển trong nội thành, tăng số chuyến
                          và cho thu nhập hiệu quả.
                        </div>
                      </div>
                    </div>
                    <div data-aos="fade-up" class="accordion-item">
                      <h2 class="accordion-header" id="headingTwo">
                        <button class="accordion-button fw-bold collapsed" type="button" data-bs-toggle="collapse"
                          data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                          Tối ưu cung đường, chi phí vận hành tăng chuyến
                        </button>
                      </h2>
                      <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
                        data-bs-parent="#accordiontaxe">
                        <div class="accordion-body">
                          Happy Trip sẽ sắp xếp lượng khách phù hợp với khung thời gian, số chỗ ngồi, cung đường di
                          chuyển theo phường quận.
                        </div>
                      </div>
                    </div>
                    <div data-aos="fade-up" class="accordion-item">
                      <h2 class="accordion-header" id="headingThree">
                        <button class="accordion-button fw-bold collapsed" type="button" data-bs-toggle="collapse"
                          data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                          Khách hàng có sẵn, yên tâm vận hành
                        </button>
                      </h2>
                      <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree"
                        data-bs-parent="#accordiontaxe">
                        <div class="accordion-body">
                          Happy Trip đảm bảo việc kết nối các khách hàng có nhu cầu, sắp xếp các chuyến đi phù hợp với
                          yêu cầu của khách.
                        </div>
                      </div>
                    </div>
                    <div data-aos="fade-up" class="accordion-item">
                      <h2 class="accordion-header" id="heading4">
                        <button class="accordion-button fw-bold collapsed" type="button" data-bs-toggle="collapse"
                          data-bs-target="#collapse4" aria-expanded="false" aria-controls="collapse4">
                          Lái xe an toàn, kinh doanh bền vũng
                        </button>
                      </h2>
                      <div id="collapse4" class="accordion-collapse collapse" aria-labelledby="heading4"
                        data-bs-parent="#accordiontaxe">
                        <div class="accordion-body">
                          Toàn bộ các chuyến đi được điều vận sắp xếp khách với các điểm đón – trả rõ ràng. Tài xế không
                          lo kiếm khách, ghép ghế sẽ an toàn trong quá trình vận hành phương tiện
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section id="bao-xe" class="pt-lg-5 mt-lg-5 bg-cs-2">
    <div class="container h-100">
      <div class="row h-100 align-items-center">
        <div class="col-lg-7">
          <img src="/img/bao-xe.png" class="w-100" alt="">
        </div>
        <div class="col-lg-5">
          <div data-aos="fade-up" class="card  shadow-sm p-3 border-0">
            <h1> Dịch Vụ Bao Xe</h1>
            <p class="fst-italic">
              Với không gian hoàn toàn riêng tư và sạch sẽ, di chuyển thuận lợi trên những cung đường được tối ưu theo
              thời gian thực. Quý khách sẽ có những chuyến đi linh hoạt và an toàn.
            </p>
            <ul class="list-unstyled m-0">
              <li data-aos="fade-up"
                class="p-2 d-flex align-items-center border mb-2 rounded border-primary bg-primary bg-opacity-10 fw-bold ">
                <Icon icon="mingcute:safety-certificate-fill" class="me-1 fs-4 text-success" />
                <small>Giá trọn gói, không phát sinh chi phí</small>
              </li>
              <li data-aos="fade-up"
                class="p-2 d-flex align-items-center border mb-2 rounded border-primary bg-primary bg-opacity-10 fw-bold ">
                <Icon icon="mingcute:safety-certificate-fill" class="me-1 fs-4 text-success" />
                <small>An toàn, đúng giờ</small>
              </li>
              <li data-aos="fade-up"
                class="p-2 d-flex align-items-center border mb-2 rounded border-primary bg-primary bg-opacity-10 fw-bold ">
                <Icon icon="mingcute:safety-certificate-fill" class="me-1 fs-4 text-success" />
                <small>Đáp ứng các nhu cầu với đa dạng loại xe</small>
              </li>
              <li data-aos="fade-up"
                class="p-2 d-flex align-items-center border mb-2 rounded border-primary bg-primary bg-opacity-10 fw-bold ">
                <Icon icon="mingcute:safety-certificate-fill" class="me-1 fs-4 text-success" />
                <small>Thoải mái như xe nhà, thuận tiện hơn xe khách</small>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section id="gioi-thieu" class="pb-5 mb-lg-5">
    <div class="container">
      <div class="row align-items-center">
        <div data-aos="fade-up" class="col-lg-8">
          <h1>Giới thiệu về <b class="text-primary">HAPPY</b> <b> TRIP</b></h1>
          <p>Nhiệm vụ của chúng tôi là mang đến cho người tiêu dùng một giải pháp di chuyển thông minh</p>
          <ol>
            <li>
              An toàn và thuận tiện, đi chung mà không chậm
            </li>
            <li>
              Tiết kiệm thời gian, chi phí xăng dầu, gia tăng số lượng chuyến, tăng thu nhập cho tài xế.
            </li>
            <li>
              Góp phần hạn chế khí thải bảo vệ môi trường, giảm áp lực lên cơ sở hạ tầng giao thông và hạn chế tắc
              đường.
            </li>
          </ol>

          <p>Đảm bảo an toàn chuyến đi bằng giải pháp tuyển chọn tài xế, bảo dưỡng định kỳ phương tiện, kiểm tra phương
            tiện trước khi vận hành và không sử dụng điện thoại trong quá trình vận hành xe.</p>

        </div>
        <div data-aos="fade-up" data-aos-delay="100" class="col-lg-4">
          <img src="/img/a1.png" class="w-100" alt="">
        </div>
      </div>
    </div>
  </section>
  <section id="lien-he" data-aos="fade-up">
    <div class="container">
      <div class="row py-5 g-3">
        <div class="col-lg-4">
          <div class="d-flex gap-2 align-items-center">
            <Icon icon="uiw:map" class="fs-4" />
            <b> 47 Nguyễn Tuân, Thanh Xuân,TP.Hà Nội</b>
            <div class="vr d-none d-lg-block ms-auto me-auto"></div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="d-flex gap-2 align-items-center">
            <Icon icon="mdi:cellphone" class="fs-4 ms-lg-auto" />
            <b> 0972 97 00 00</b>
            <div class="vr ms-auto d-none d-lg-block me-auto"></div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="d-flex gap-2 align-items-center">
            <Icon icon="mdi:email-outline" class="fs-4" />
            <b> happytripexpress@gmail.com</b>
          </div>
        </div>
      </div>
    </div>

  </section>
  <section class="my-5 py-5">
    <div class="container">
      <div class="row">
        <div class="col-lg-6">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7447.32285326834!2d105.87112900000001!3d21.046229!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abd41db4e18d%3A0xcc0a5608f6c39292!2zMTkyIMSQLiBOZ-G7jWMgTMOibSwgTmfhu41jIEzDom0sIExvbmcgQmnDqm4sIEjDoCBO4buZaSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2sus!4v1713419983698!5m2!1svi!2sus"
            width="100%" height="450" style="border:0;" loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div class="col-lg-6">
          <fontend-func-lien-he />
        </div>
      </div>
    </div>
  </section>
</template>
