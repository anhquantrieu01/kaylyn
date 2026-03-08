import { getServicesGrouped } from "@/features/services/services";
import ServicesFilter from "./ServicesFilter";
import ServiceVideos from "./ServiceVideo";

export default async function ServicesPage() {
  const categories = await getServicesGrouped();
    const services = [
  {
    title: "Meso căng bóng, trắng da",
    desc: "Cấp ẩm sâu – cải thiện độ sáng và độ đàn hồi của da",
    video: "/videos/meso-cang-bong-trang-da.mp4",
  },
  {
    title: "Peel căng bóng, trắng da",
    desc: "Loại bỏ tế bào chết – làm sáng và mịn da nhanh chóng",
    video: "/videos/peel-cang-bong-trang-da.mp4",
  },
  {
    title: "Meso căng bóng, trẻ hoá da",
    desc: "Tăng sinh collagen – giúp da săn chắc và tươi trẻ",
    video: "/videos/meso-cang-bong-tre-hoa-da.mp4",
  },
  {
    title: "Filler môi",
    desc: "Tạo dáng môi đầy đặn – cân đối và tự nhiên",
    video: "/videos/filler-moi-1.mp4",
  },
  {
    title: "Meso trị thâm mắt",
    desc: "Giảm quầng thâm – cải thiện vùng da mắt mệt mỏi",
    video: "/videos/meso-tri-tham-mat.mp4",
  },
  {
    title: "Thon gọn vai",
    desc: "Giúp vai gọn gàng – dáng cổ vai thanh thoát hơn",
    video: "/videos/thon-gon-vai.mp4",
  },
  {
    title: "Điều trị sẹo lồi",
    desc: "Làm phẳng sẹo – cải thiện bề mặt da hiệu quả",
    video: "/videos/dieu-tri-seo-loi.mp4",
  },
  {
    title: "Filler môi",
    desc: "Tăng độ căng mọng – định hình môi hài hòa khuôn mặt",
    video: "/videos/filler-moi-2.mp4",
  },
  {
    title: "Xoá nhăn cau mày, đuôi mắt, trán",
    desc: "Làm mờ nếp nhăn – gương mặt trẻ trung hơn",
    video: "/videos/xoa-nhan-cau-may-duoi-mat-tran.mp4",
  },
  {
    title: "B.A.P tăng sinh collagen - nâng cơ - trẻ hoá da",
    desc: "Kích thích collagen tự nhiên – da săn chắc và đàn hồi",
    video: "/videos/bap-tang-sinh-collagen-nang-co-tre-hoa-da.mp4",
  },
  {
    title: "Peel căng bóng da",
    desc: "Thanh lọc da – giúp da sáng và đều màu hơn",
    video: "/videos/peel-cang-bong-da-1.mp4",
  },
  {
    title: "Filler môi",
    desc: "Cải thiện dáng môi – mềm mại và tự nhiên",
    video: "/videos/filler-moi-3.mp4",
  },
  {
    title: "Phun lông mày tự nhiên",
    desc: "Định hình chân mày – hài hòa khuôn mặt",
    video: "/videos/phun-long-may-tu-nhien.mp4",
  },
  {
    title: "Phun môi",
    desc: "Tạo màu môi tươi tắn – cải thiện môi thâm",
    video: "/videos/phun-moi.mp4",
  },
  {
    title: "Filler môi",
    desc: "Tạo hiệu ứng môi căng mọng – quyến rũ tự nhiên",
    video: "/videos/filler-moi-4.mp4",
  },
  {
    title: "Tai form Douyin",
    desc: "Tạo dáng tai nhỏ gọn – chuẩn xu hướng Douyin",
    video: "/videos/tai-form-douyin.mp4",
  },
  {
    title: "Xóa nhăn",
    desc: "Giảm nếp nhăn – giúp da mịn và trẻ trung hơn",
    video: "/videos/xoa-nhan.mp4",
  },
];
  return (
    <>
        <ServicesFilter categories={categories} />
        <ServiceVideos services={services} />
    </>
        
  )
}