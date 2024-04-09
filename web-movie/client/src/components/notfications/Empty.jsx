import moment from "moment";

export const Empty = ({ message }) => {
  return (
    <div className="flex-colo w-full py-12 px-4 rounded border-2 border-border bg-main gap-4">
      <div className="flex-colo w-64  text-subMain text-4xl">
        <img
          src="/images/empty.png"
          alt="empty"
          className="text-center w-full"
        />
      </div>
      <p className="text-border text-sm">{message}</p>
    </div>
  );
};

export const shortUppercaseId = (id) => {
  return id.slice(0, 8).toUpperCase();
};

export const DateFormat = (date) => {
  return moment(date).format("LL");
};
