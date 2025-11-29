import VisitCounter from "../components/VisitCounter";
import TadawulCalculator from "../components/TadawulCalculator";

export default function HomePage() {
  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      {/* العداد في الأعلى بالمنتصف مع تنسيق وأيقونة */}
      <div
        style={{
          display: "inline-block",
          backgroundColor: "#f0f8ff", // خلفية فاتحة
          border: "2px solid #0070f3", // إطار أزرق
          borderRadius: "10px",
          padding: "15px 30px",
          fontSize: "20px",
          fontWeight: "bold",
          color: "#0070f3",
        }}
      >
        📊 عدد الزيارات: <VisitCounter />
      </div>

      {/* عنوان الصفحة */}
      <h1 style={{ marginTop: "30px", fontSize: "28px" }}>تداول كالكوليتر</h1>

      {/* الحاسبة تحت العنوان */}
      <div style={{ marginTop: "40px" }}>
        <TadawulCalculator />
      </div>
    </div>
  );
}
