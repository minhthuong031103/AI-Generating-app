import React, { useState, useEffect } from 'react';
import FormField from '../components/FormField';
import Loader from '../components/Loader';
import Card from '../components/Card';
const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }

  return (
    <h2
      className="mt-5 font-bold text-[#6469ff] 
    text-xl uppercase"
    >
      {title}
    </h2>
  );
};
export default function Home() {
  const [isLoading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);

  const fetchPosts = async function () {
    setLoading(true);
    try {
      const response = await fetch(
        'https://aigeneratingapp.onrender.com/api/v1/post/all',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        setAllPosts(result.data.reverse());
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(function () {
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">
          Happy birthday Tuyết Nhi!!!!!!!
        </h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">
          Hehe vì a biết là gặp em hơi khó vì mấy ngày tới em bận đi sinh nhật
          nữa nên là anh tặng em cái web này. (Dcm loay hay cả ngày trời đó
          huhu) Mấy này đều là ảnh anh lưu lại á, bất cứ bức hình nào em gửi anh
          hay của em anh cũng đều rất thích. Cái quỷ này là anh tự nghĩ ra á
          heheheheh =))) Anh mong là bước qua tuổi mới em sẽ vui vẻ hơn, tìm
          được những mối quan hệ lành mạnh mới, yêu bản thân của mình nhiều hơn,
          và yêu mẹ nhiều hơn nữa nha, mẹ thương em nhiều lắm đó và anh cũng tin
          là ngược lại, anh biết nhiều khi em có những nỗi buồn riêng nhưng mà
          đừng lúc nào cũng cố chịu đựng một mình nha. Không biết từ lúc nào mà
          mỗi sáng thức dậy người đầu tiên anh nghĩ đến là em, trước khi nhắm
          mắt ngủ cũng là em, lúc làm việc cũng là em =))))) Đôi lúc anh hơi bận
          nhưng mà anh chỉ thích nói chuyện với một mình Tuyết Nhi thôi. Tính
          anh hổng có thích nói nhiều nên là tới đây thôi nha hj =]]
          <br />
          Chúc em sinh nhật vui vẻ, love u.
          <br />
          <br />
          <br />
          (Khi nào được gặp em thì anh sẽ có quà khác sau nha :)) ) Em có thể
          nhấn vào từng ảnh là sẽ có chú thích của anh á, và có thể down về luôn
          nữa =))))
          <br />
          <br />
          <br />
          Hé nhô bé, nay đúng 00:00 24/5, anh chúc mừng sinh nhật em ạ =)))) Bên
          dưới là món quà nho nhỏ a tặng em nha, nhma khi nào gặp thì anh đưa há
          cái này em mà không lấy là anh ko có tặng cho ai được hết đó =))))))
          nên là phải lấy nha hi
        </p>
      </div>
      <div className="mt-16">
        <FormField
          labelName="Tìm kiếm"
          type="text"
          name="text"
          placeholder="Gõ linh tinh vô đây =))..."
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className="mt-10">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <Loader></Loader>
          </div>
        ) : (
          // if searchText null=> ko hien
          <>
            {searchText && (
              <h2
                className="font-medium text-[#666e75]
             text-xl mb-3"
              >
                Showing results for{' '}
                <span className="text-[#222328]">{searchText}</span>
              </h2>
            )}
            <div
              className="grid lg:grid-cols-4 sm:grid-cols-3
            xs:grid-cols-2 grid-cols-1 gap-3
            "
            >
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title="No Search Results Found"
                />
              ) : (
                <RenderCards data={allPosts} title="No Posts Yet" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
