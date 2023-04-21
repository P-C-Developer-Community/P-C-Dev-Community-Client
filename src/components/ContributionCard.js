import { Link } from "react-router-dom";
import { Fragment, useState } from "react";
import DetailsModal from "./DetailsModal";

function ContributionCard({
  title,
  description,
  _id,
  owner,
  imageUrl,
  languages,
}) {
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  return (
    <Fragment>
      <div>
        <div className="w-64 h-96  backdrop-blur-xl overflow-hidden rounded-2xl border shadow-xl shadow-cyan-300/80 hover:shadow-slate-50 hover:rounded-full transition-all duration-300 ease-in-out transition duration-1000 ease-in-out relative">
          <Link
            to={`/contribution/${_id}`}
            onClick={(e) => {
              e.preventDefault();
              setShowDetailsModal(true);
            }}>
            <div className="flex flex-col items-center justify-center">
              <img
                src={imageUrl}
                alt=""
                className=" mb-4 drop-shadow-2xl shadow-black h-42 w-42 rounded-2xl"
              />

              <div className="flex flex-col items-center  mr-16 ml-16 mb-2 ">
                <h2 className="text-white font-mono  antialiased italic font-black text-2xl  line-clamp-1 ">
                  {title}
                </h2>
                <div className="p-2">
                  <div className="max-h-36 max-w-36 w-auto h-auto  overflow-auto hover:overscroll-contain line-clamp-6">
                    <p className="text-slate-200 font-semibold mt-2">
                      Code languages:
                    </p>
                    {languages.map((lang) => {
                      return (
                        <ul className="text-slate-200">
                          <li>{lang}</li>
                        </ul>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <DetailsModal
        isVisible={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        description={description}
        title={title}
        itemType="contribution"
        _id={_id}
      />
    </Fragment>
  );
}

export default ContributionCard;
