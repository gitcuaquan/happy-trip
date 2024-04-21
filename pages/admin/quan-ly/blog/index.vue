<script setup lang="ts">
</script>

<template>
  <div class="row mt-3">
    <div class="col-12 text-end">
      <nuxt-link to="/admin/quan-ly/blog/action" class="btn btn-primary text-light">Tạo Mới</nuxt-link>
    </div>
    <div class="col-12">
      <div class="card border-0 shadow-sm p-3">
        <table class="table">
          <thead>
          <tr>
            <th scope="col">Ảnh đại diện</th>
            <th scope="col">Tiêu đề bài viêt</th>
            <th scope="col">Ngày tạo</th>
            <th scope="col">Trạng thái</th>
            <th scope="col" class="text-end">Hành động</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td >
              <img src="https://www.kkday.com/vi/blog/wp-content/uploads/chup-anh-dep-bang-dien-thoai-25.jpg" style="width: 30px" alt="">
            </td>
            <td>
              Bài viết 1
            </td>
            <td>
              Ngày tạo
            </td>
            <td>
              <span class="badge bg-success">
                  Đang hoạt động
              </span>
            </td>
            <td class="text-end">
              <button class="btn btn-outline-dark">
                Sửa bài viết
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>