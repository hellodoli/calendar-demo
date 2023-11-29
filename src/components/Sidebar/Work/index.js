const WorkItem = ({ work }) => {
  const {
    color: { border = "", text = "", background = "" },
    tile,
    customer,
    location,
  } = work;
  return (
    <div
      class="fc-event jobslist active-joblist"
      style={{
        backgroundColor: background,
        borderLeft: `4px solid ${border}`,
      }}
      title={tile?.header}
      data-info={JSON.stringify(work)}
    >
      <div class="name" style={{ color: text }}>
        <div class="icon">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12.5 8.5C15.8137 8.5 18.5 11.1863 18.5 14.5C18.5 17.8137 15.8137 20.5 12.5 20.5C9.18629 20.5 6.5 17.8137 6.5 14.5C6.5 11.1863 9.18629 8.5 12.5 8.5Z"
              fill="#FFF5EC"
            ></path>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11.5 8.5C14.8137 8.5 17.5 11.1863 17.5 14.5C17.5 17.8137 14.8137 20.5 11.5 20.5C8.18629 20.5 5.5 17.8137 5.5 14.5C5.5 11.1863 8.18629 8.5 11.5 8.5Z"
              stroke="#FF871E"
              stroke-width="1.3"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11.5 12.5C12.0523 12.5 12.5 12.9477 12.5 13.5C12.5 14.0523 12.0523 14.5 11.5 14.5C10.9477 14.5 10.5 14.0523 10.5 13.5C10.5 12.9477 10.9477 12.5 11.5 12.5Z"
              stroke="#FF871E"
              stroke-width="1.3"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M7.5 9.5V7.5C7.5 5.29086 9.29086 3.5 11.5 3.5C13.7091 3.5 15.5 5.29086 15.5 7.5V9.5"
              stroke="#FF871E"
              stroke-width="1.3"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M11.5 14.5V16.5"
              stroke="#FF871E"
              stroke-width="1.3"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </div>
        <span class="word-break">{tile?.header}</span>
      </div>
      <div class="info" style={{ color: text }}>
        {customer?.first_name}
      </div>
      <div class="info" style={{ color: text }}>
        {location?.name}{" "}
      </div>
      <div class="info" style={{ color: text }}>
        {tile?.content?.length ? tile?.content[tile.content.length - 1] : ""}
      </div>
    </div>
  );
};

export default WorkItem;
