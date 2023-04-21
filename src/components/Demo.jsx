import { useState, useEffect } from "react";
import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";
import { motion } from "framer-motion";
import { fadeAnimation } from "../utils/motion";

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });
  const [allArticles, setAllArticles] = useState([]);
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();
  const [copied, setCopied] = useState("");

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];
      setArticle(newArticle);
      setAllArticles(updatedAllArticles);
      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    }
  };

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false, 3000));
  };

  const {
    sectionWrapper,
    heroWrapper,
    formStyles,
    imageStyles,
    buttonStyles,
    urlHistoryStyle,
    paragraphStyle,
    resultWrapper,
    loaderIconStyle,
    resultParagraphStyle,
    resultSpanStyle,
    summaryWrapper,
    summaryHeader,
    summaryParagraph,
  } = styles;

  return (
    <section className={`${sectionWrapper}`}>
      <div className={`${heroWrapper}`}>
        <form className={`${formStyles}`} onSubmit={handleSubmit}>
          <img src={linkIcon} alt="link_icon" className={`${imageStyles}`} />
          <input
            type="url"
            placeholder="Enter a URL"
            value={article.url}
            onChange={(e) =>
              setArticle({
                ...article,
                url: e.target.value,
              })
            }
            required
            className="url_input"
          />
          <button type="submit" className={`${buttonStyles}`}>
            {`=>`}
          </button>
        </form>
        {/**
          !browse URL History
         */}
        <motion.div className={`${urlHistoryStyle}`} {...fadeAnimation}>
          {allArticles.map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className="link_card"
            >
              <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                <img
                  src={copied === item.url ? tick : copy}
                  alt="copy_icon"
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>
              <p className={`${paragraphStyle}`}>{item.url}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Display Result */}
      <motion.div className={`${resultWrapper}`} {...fadeAnimation}>
        {isFetching ? (
          <img src={loader} alt="loader" className={`${loaderIconStyle}`} />
        ) : error ? (
          <p className={`${resultParagraphStyle}`}>
            Well, that was not supposed to happen...
            <br />
            <span className={`${resultSpanStyle}`}>{error?.data?.error}</span>
          </p>
        ) : (
          article.summary && (
            <div className={`${summaryWrapper}`}>
              <h2 className={`${summaryHeader}`}>
                Article <span className="purple_gradient">Summary</span>
              </h2>
              <div className="summary_box">
                <p className={`${summaryParagraph}`}>{article.summary}</p>
              </div>
            </div>
          )
        )}
      </motion.div>
    </section>
  );
};

const styles = {
  sectionWrapper: "mt-16 w-full max-w-xl",
  heroWrapper: "flex flex-col w-full gap-2",
  formStyles: "relative flex justify-center items-center",
  imageStyles: "absolute left-0 my-2 ml-3 w-5",
  buttonStyles:
    "submit_btn peer-focus:border-purple-400 peer-focus:text-purple-400",
  urlHistoryStyle: "flex flex-col gap-1 max-h-60 overflow-y-auto",
  paragraphStyle:
    "flex-1 font-satoshi text-purple-400 font-medium text-sm truncate",
  resultWrapper: "my-10 max-w-full flex justify-center items-center",
  loaderIconStyle: "w-20 h-20 object-contain",
  resultParagraphStyle: "font-inter font-bold text-black text-center",
  resultSpanStyle: "font-satoshi font-normal text-gray-700",
  summaryWrapper: "flex flex-col gap-3",
  summaryHeader: "font-satoshi font-bold text-gray-600 text-xl",
  summaryParagraph: "font-inter font-medium text-sm text-black",
};

export default Demo;
