import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AudioOutlined,
  SoundOutlined,
  TrophyOutlined,
  CheckSquareOutlined,
  ShoppingCartOutlined
} from "@ant-design/icons";
import { AutoComplete, Avatar, Card, Input, Rate, Tooltip } from "antd";
import Login from "./login/Login";
import CardUser from "./login/CardUser";
import apiCommon from "../apis/funcionApi";
const { Search } = Input;

const Navbar = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [resultSearch, setResult] = useState([]);
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    const account = localStorage.getItem("accessToken");
    setIsLogin(!!account);

    const handleStorageChange = () => {
      const account = localStorage.getItem("accessToken");
      setIsLogin(!!account);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: "#1677ff"
      }}
    />
  );
  const handleClick = () => {
    setClicked(!clicked);
  };
  const handleChooseSearch = (item) => {
    
  };
 
  const onSelect = (arg) => {
    console.log(arg);
  };
  const logout = () => {
    localStorage.removeItem("account");
    setIsLogin(false);
  };

  const handleSearch = (query) => {
    // Gọi API tìm kiếm
    apiCommon.search({ query }).then((res) => {
      const serverData = res.data; // Dữ liệu từ server
      const formattedData = serverData.map((item, index) => ({
        value: item.title, // Giá trị hiển thị trong ô tìm kiếm
        label: (
          <div key={index}>
            <Card.Meta
              title={<strong>{item.title}</strong>}
              onClick={() => handleChooseSearch({ source: item.source, id: item.id })} // Thêm logic xử lý khi chọn
              description={
                <Tooltip title={item.address} placement="right">
                  <div className="label-research-container">
                    <span>{item.address}</span>
                    <Rate defaultValue={item.rate || 0} disabled />
                  </div>
                </Tooltip>
              }
            />
          </div>
        ),
      }));
      // Cập nhật danh sách gợi ý
      setResult(formattedData);
    });
  };

  const onSearch = (text) => {
    console.log("Searching for:", text);
    if (text) {
      handleSearch(text); // Gọi tìm kiếm khi có input
    } else {
      setResult([]); // Xóa gợi ý khi không có từ khóa
    }
  };

  return (
    <nav className="NavbarItems">
      <div className="navbar-logo" onClick={() => navigate("/home")}>
        Travel
      </div>
      <div className="navbar-search">
        <AutoComplete
          options={resultSearch}
          onSelect={onSelect}
          onSearch={(text) => onSearch(text)}
          style={{ width: 400 }}
          popupMatchSelectWidth={252}
        >
          <Input.Search placeholder="Bạn muốn tìm kiếm gì ?" onChange={(e) => handleSearch(e.target.value)} enterButton />
        </AutoComplete>
      </div>
      <div className="menu-icons" onClick={handleClick}>
        <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
      </div>

      <ul className={clicked ? "nav-menu active" : "nav-menu"}>
        <li key={0}>
          <Link className={"nav-links"} to={"/destination"}>
            <SoundOutlined />
            Phát âm
          </Link>
        </li>
        {}
        <li key={2}>
          <Link className={"nav-links"} to={"/contact"}>
            <TrophyOutlined />
            Xếp hạng
          </Link>
        </li>
        <li key={0}>
          <Link className={"nav-links"} to={"/destination"}>
            <CheckSquareOutlined />
            Nhiệm vụ
          </Link>
        </li>
        <li key={0}>
          <Link className={"nav-links"} to={"/destination"}>
            <ShoppingCartOutlined />
            Của hàng
          </Link>
        </li>
      </ul>
      {isLogin ? <CardUser logout={logout}></CardUser> : <Login setLogin={setIsLogin} />}
    </nav>
  );
};

export default Navbar;
