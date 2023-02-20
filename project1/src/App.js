import styles from "./App.module.scss";
import classNames from "classnames/bind";
import Input from "./components/Input/Input";
import images from "./assets/images";
import { useEffect, useState } from "react";
const cx = classNames.bind(styles);
function App() {
  const [line, setLine] = useState("");
  const [widthStrip, setWidthStrip] = useState("");
  const [heightStrip, setHeightStrip] = useState("");
  const [dielectricStrip, setDielectricStrip] = useState("");
  const [dielectricStripResult, setDielectricStripResult] = useState("");
  const [dkvobo, setDkvoboc] = useState("");
  const [dkLoi, setDkLoi] = useState("");
  const [widthOng, setWidthOng] = useState("");
  const [heightOng, setHeightOng] = useState("");
  const [distance, setDistance] = useState("");
  const [resistor, setResistor] = useState("");
  const [withDaiDan, setWithDaiDan] = useState("");
  const handleSelect = (e) => {
    setLine(e.target.value);
  };
  useEffect(() => {
    setWidthStrip("");
    setHeightStrip("");
    setDielectricStrip("");
    setDielectricStripResult("");
    setDkvoboc("");
    setDkLoi("");
    setWidthOng("");
    setHeightOng("");
    setDistance("");
    setResistor("");
    setWithDaiDan("");
  }, [line]);
  const handleSubmit = () => {
    // console.log(dielectricStripValue);

    const widthStripValue = parseFloat(widthStrip);

    const dielectricStripValue = parseFloat(dielectricStrip);
    let resistorValue = 0;
    switch (line) {
      case "đường truyền vi dải":
        const heightStripValue = parseFloat(heightStrip);
        const dielectricStripResultValue =
          (dielectricStripValue + 1) / 2 +
          ((dielectricStripValue - 1) / 2) *
            (1 / Math.sqrt(1 + (12 * heightStripValue) / widthStripValue));
        const tyle = widthStripValue / heightStripValue;
        resistorValue =
          tyle > 1
            ? (120 * 3.14) /
              (Math.sqrt(dielectricStripResultValue) *
                (widthStripValue / heightStripValue +
                  1.393 +
                  0.667 * Math.log(widthStripValue / heightStripValue + 1.444)))
            : (60 / Math.sqrt(dielectricStripResultValue)) *
              Math.log(
                (8 * heightStripValue) / widthStripValue +
                  widthStripValue / (4 * heightStripValue)
              );
        // console.log(dielectricStripResultValue);
        setDielectricStripResult(dielectricStripResultValue);
        setResistor(resistorValue);
        // setWidthStrip("");
        // setHeightStrip("");
        // setDielectricStrip("");
        break;
      case "mạch dải":
        const distanceValue = parseFloat(distance);
        console.log(distanceValue);
        const ratio = widthStripValue / distanceValue;
        const withDaiDanValue =
          ratio > 0.35
            ? widthStripValue
            : widthStripValue -
              distanceValue *
                Math.pow(0.35 - widthStripValue / distanceValue, 2);

        setWithDaiDan(Math.abs(withDaiDanValue));
        resistorValue =
          ((30 * 3.14) / Math.sqrt(dielectricStripValue)) *
          (distanceValue / (withDaiDanValue + 0.441 * distanceValue));

        setResistor(resistorValue);
        // setWithDaiDan("");
        // setDistance("");
        // setDielectricStrip("");
        // setWidthStrip("");
        break;
      case "cáp đồng trục":
        const dkvoboValue = parseFloat(dkvobo);
        const dkLoiValue = parseFloat(dkLoi);
        resistorValue =
          (138 * Math.log10(dkvoboValue / dkLoiValue)) /
          Math.sqrt(dielectricStripValue);
        setResistor(resistorValue);
        // setDkvoboc("");
        // setDkLoi("");
        // setDielectricStrip("");
        break;
      case "ống dẫn sóng":
        const widthOngValue = parseFloat(widthOng);
        const heightOngValue = parseFloat(heightOng);
        resistorValue =
          (((120 * 3.14) / Math.sqrt(dielectricStripValue - 1)) *
            widthOngValue) /
          heightOngValue;
        setResistor(resistorValue);
        // setHeightOng("");
        // setDielectricStrip("");
        // setWidthOng("");
        break;
      default:
        break;
    }
  };
  const renderLineContent = (line) => {
    switch (line) {
      case "đường truyền vi dải":
        return (
          <div className={cx("input-content")}>
            <Input
              unit="mm"
              value={widthStrip}
              onChange={(e) => {
                setWidthStrip(e.target.value);
                console.log(e.target.value);
              }}
            >
              Độ rộng của đường truyền vi dải(W)
            </Input>
            <Input
              unit="mm"
              value={heightStrip}
              onChange={(e) => {
                setHeightStrip(e.target.value);
              }}
            >
              Độ dày đế điện môi(d)
            </Input>
            <Input
              value={dielectricStrip}
              onChange={(e) => {
                setDielectricStrip(e.target.value);
              }}
            >
              Hằng số điện môi ε-r
            </Input>
          </div>
        );
      case "mạch dải":
        return (
          <div className={cx("input-content")}>
            <Input
              unit="mm"
              value={widthStrip}
              onChange={(e) => {
                setWidthStrip(e.target.value);
              }}
            >
              Chiều rộng của dải dẫn(W)
            </Input>
            <Input
              unit="mm"
              value={distance}
              onChange={(e) => {
                setDistance(e.target.value);
              }}
            >
              Khoảng cách giữa 2 mặt phẳng đất(b)
            </Input>
            <Input
              value={dielectricStrip}
              onChange={(e) => {
                setDielectricStrip(e.target.value);
              }}
            >
              Hằng số điện môi ε-r
            </Input>
          </div>
        );
      case "cáp đồng trục":
        return (
          <div className={cx("input-content")}>
            <Input
              unit="mm"
              value={dkvobo}
              onChange={(e) => {
                setDkvoboc(e.target.value);
              }}
            >
              Đường kính của vỏ bọc(D)
            </Input>
            <Input
              unit="mm"
              value={dkLoi}
              onChange={(e) => {
                setDkLoi(e.target.value);
              }}
            >
              Đường kính của lõi(d)
            </Input>
            <Input
              value={dielectricStrip}
              onChange={(e) => {
                setDielectricStrip(e.target.value);
              }}
            >
              Hằng số điện môi ε-r
            </Input>
          </div>
        );
      case "ống dẫn sóng":
        return (
          <div className={cx("input-content")}>
            <Input
              unit="mm"
              value={widthOng}
              onChange={(e) => {
                setWidthOng(e.target.value);
              }}
            >
              Chiều rộng của ấn dẫn sóng(a)
            </Input>
            <Input
              unit="mm"
              value={heightOng}
              onChange={(e) => {
                setHeightOng(e.target.value);
              }}
            >
              Chiều cao của ống dẫn sóng(b)
            </Input>
            <Input
              value={dielectricStrip}
              onChange={(e) => {
                setDielectricStrip(e.target.value);
              }}
            >
              Hằng số điện môi ε-r
            </Input>
          </div>
        );

      default:
        return <></>;
    }
  };
  const renderResultItem = (line) => {
    switch (line) {
      case "đường truyền vi dải":
        return (
          <div className={cx("result")}>
            <img src={images.MicrostripPicture} alt="Ảnh microstrip" />
            <h2 className={cx("result-title")}>Kết quả</h2>
            <Input value={dielectricStripResult} onChange={() => {}}>
              Hằng số điện môi hiêu dụng ε-e
            </Input>
            <Input unit="Ohm" value={resistor} onChange={() => {}}>
              Trở kháng đặc tính{" "}
            </Input>
          </div>
        );
      case "mạch dải":
        return (
          <div className={cx("result")}>
            <img src={images.MachDai} alt="Ảnh mạch dải" />
            <h2 className={cx("result-title")}>Kết quả</h2>
            <Input value={withDaiDan} onChange={() => {}}>
              Độ rộng hiệu dụng của dải dẫn
            </Input>
            <Input unit="Ohm" value={resistor} onChange={() => {}}>
              Trở kháng đặc tính{" "}
            </Input>
          </div>
        );
      case "cáp đồng trục":
        return (
          <div className={cx("result")}>
            <img src={images.CapDongTruc} alt="Ảnh cáp đồng trục" />
            <h2 className={cx("result-title")}>Kết quả</h2>

            <Input unit="Ohm" value={resistor} onChange={() => {}}>
              Trở kháng đặc tính{" "}
            </Input>
          </div>
        );
      case "ống dẫn sóng":
        return (
          <div className={cx("result")}>
            <img src={images.OngdanSong} alt="Ảnh cáp đồng trục" />
            <h2 className={cx("result-title")}>Kết quả</h2>

            <Input unit="Ohm" value={resistor} onChange={() => {}}>
              Trở kháng đặc tính{" "}
            </Input>
          </div>
        );

      default:
        return <></>;
    }
  };
  return (
    <div className={cx("wrapper")}>
      <h2 className={cx("title")}>
        Tính toán trở kháng đặc tính của đường truyền cao tần
      </h2>
      <div className={cx("container")}>
        <div className={cx("container-input")}>
          <div className={cx("select")}>
            <h4>Chọn loại đường truyền</h4>
            <select className={cx("btn-select")} onChange={handleSelect}>
              <option>Chọn loại đường truyền</option>
              <option>đường truyền vi dải</option>
              <option>mạch dải</option>
              <option>cáp đồng trục</option>
              <option>ống dẫn sóng</option>
            </select>
          </div>
          {renderLineContent(line)}
          <button type="button" className={cx("submit")} onClick={handleSubmit}>
            Tính toán
          </button>
        </div>

        {renderResultItem(line)}
      </div>
    </div>
  );
}

export default App;
