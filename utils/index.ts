export function Money(amount: number) {
    const config = {style: 'currency', currency: 'VND', maximumFractionDigits: 9}
    return new Intl.NumberFormat('vi-VN', config).format(amount);
}

export function formatDate(dateTimeString: string): string {
    if (!dateTimeString) return "Không có dữ liệu"
    // Chuyển đổi chuỗi ngày giờ sang Date
    const date = new Date(dateTimeString);

    // Lấy ngày, tháng, giờ và phút
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    // Định dạng chuỗi ngày giờ theo yêu cầu
    const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}`;

    return formattedDate;
}

export function convertDate(date: string): string {
    const inputDate = new Date(date);

    const year = inputDate.getUTCFullYear();
    const month = String(inputDate.getUTCMonth() + 1).padStart(2, '0');
    const day = String(inputDate.getUTCDate()).padStart(2, '0');
    const hours = String(inputDate.getUTCHours()).padStart(2, '0');
    const minutes = String(inputDate.getUTCMinutes()).padStart(2, '0');
    const seconds = String(inputDate.getUTCSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function convertToSlug(str: string) {
    let title, slug

    //Đổi chữ hoa thành chữ thường
    slug = str.toLowerCase()

    //Đổi ký tự có dấu thành không dấu
    slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a')
    slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e')
    slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i')
    slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o')
    slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u')
    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y')
    slug = slug.replace(/đ/gi, 'd')
    //Xóa các ký tự đặt biệt
    slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\|_/gi, '')
    //Đổi khoảng trắng thành ký tự gạch ngang
    slug = slug.replace(/ /gi, "-")
    //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
    //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
    slug = slug.replace(/\-\-\-\-\-/gi, '-')
    slug = slug.replace(/\-\-\-\-/gi, '-')
    slug = slug.replace(/\-\-\-/gi, '-')
    slug = slug.replace(/\-\-/gi, '-')
    //Xóa các ký tự gạch ngang ở đầu và cuối
    slug = '@' + slug + '@'
    slug = slug.replace(/\@\-|\-\@|\@/gi, '')
    //In slug ra textbox có id “slug”
    return slug
}

export const baseURL = "https://demo.olmom.com/api"
//https://demo.olmom.com
//https://localhost:7215/api