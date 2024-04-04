import React from "react";
import MainModal from "./MainModal";
import {
  FaFacebook,
  FaPinterest,
  FaTelegram,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import {
  EmailShareButton,
  FacebookShareButton,
  PinterestShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

const ShareMovieModal = ({ modalOpen, setModalOpen, movie }) => {
  if (!movie) {
    return null; // Hoặc bạn có thể trả về một thông báo hoặc UI khác tùy ý
  }
  const shareData = [
    {
      icon: FaFacebook,
      color: "#1877f2",
      shareButton: FacebookShareButton,
    },
    {
      icon: FaTwitter,
      color: "#1da1f2",
      shareButton: TwitterShareButton,
    },
    {
      icon: FaTelegram,
      color: "#0088cc",
      shareButton: TelegramShareButton,
    },
    {
      icon: FaWhatsapp,
      color: "#25D366",
      shareButton: WhatsappShareButton,
    },
    {
      icon: FaPinterest,
      color: "#bd081c",
      shareButton: PinterestShareButton,
    },
    {
      icon: MdEmail,
      color: "#f28f1a",
      shareButton: EmailShareButton,
    },
  ];
  const url = `${window.location.protocol}//${window.location.host}/movie/${movie.name}`;
  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block sm:4/5 border-border md:w-3/5 lg:w-2/5 border w-full align-middle p-10 overflow-y-auto h-full bg-main text-white rounded-2xl">
        <h2 className="text-2xl">
          Share <span className="text-xl font-bold">"{movie.name}"</span>
        </h2>
        <form className="flex-rows flex-wrap gap-6 mt-6">
          {shareData.map((data, i) => (
            <data.shareButton
              key={i}
              url={url}
              quote="Movies Fast | Free Movies Site"
            >
              <div className="w-12 transitions hover:bg-subMain flex-colo text-lg h-12 text-subMain bg-white rounded bg-opacity-30">
                <data.icon
                  className="w-10 h-10"
                  style={{ color: data.color }}
                />
              </div>
            </data.shareButton>
          ))}
        </form>
      </div>
    </MainModal>
  );
};

export default ShareMovieModal;
