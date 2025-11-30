import { useEffect, useState } from "react";
import { ref, get, set } from "firebase/database";
import { db } from "../firebaseConfig"; // تأكد أن لديك ملف firebaseConfig.ts فيه إعدادات المشروع

export default function VisitCounter() {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const counterRef = ref(db, "visits");

    // قراءة العدد الحالي من Firebase
    get(counterRef).then((snapshot) => {
      if (snapshot.exists()) {
        const current = snapshot.val();
        setCount(current);

        // زيادة العدد بواحد عند كل زيارة
        set(counterRef, current + 1);
      } else {
        // إذا لم يوجد، أنشئه من الصفر
        set(counterRef, 1);
        setCount(1);
      }
    });
  }, []);

  return <span>{count}</span>;
}
