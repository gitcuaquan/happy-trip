export function Money(amount: number) {
    const config = {style: 'currency', currency: 'VND', maximumFractionDigits: 9}
    return new Intl.NumberFormat('vi-VN', config).format(amount);
}
export function formatDate(dateTimeString: string): string {
    if(!dateTimeString) return "Không có dữ liệu"
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
export  function convertDate(date: string): string {
    const inputDate = new Date(date);

    const year = inputDate.getUTCFullYear();
    const month = String(inputDate.getUTCMonth() + 1).padStart(2, '0');
    const day = String(inputDate.getUTCDate()).padStart(2, '0');
    const hours = String(inputDate.getUTCHours()).padStart(2, '0');
    const minutes = String(inputDate.getUTCMinutes()).padStart(2, '0');
    const seconds = String(inputDate.getUTCSeconds()).padStart(2, '0');
    return  `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
export  const baseURL="https://demo.olmom.com/api"