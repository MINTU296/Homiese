// "use client";  // Ensure client-side execution

// import Layout from "@/app/college-Info/infopage_layout";
// import CollegePage from "@/app/college-Info/college_info";


// import { useEffect, useState } from "react";

// export default function CollegeInfoPage() {
//     const [message, setMessage] = useState("");

//     useEffect(() => {
//       fetch("http://localhost:3000/api/hello")  // Call Express API
//         .then((res) => res.json())
//         .then((data) => setMessage(data.message))
//         .catch((error) => console.error("Error fetching data:", error));
//     }, []);
//     return (
//         <Layout>
//             <CollegePage />
//         </Layout>
//     );
// }




"use client";

import Layout from "@/app/college-Info/infopage_layout";
import CollegePage from "@/app/college-Info/college_info";
import { useEffect, useState } from "react";

export default function CollegeInfoPage() {
    const [message, setMessage] = useState("");

    useEffect(() => {
      fetch("http://localhost:3000/api/hello")  // Call Express API
        .then((res) => res.json())
        .then((data) => setMessage(data.message))  // Set the response message
        .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return (
        <Layout>
            <CollegePage />
            {/* Display the message from the backend */}
            <div className="mt-4 p-4 bg-gray-100 text-center rounded-lg">
                <p className="text-lg font-semibold text-blue-600">
                    {message || "Loading..."}
                </p>
            </div>
        </Layout>
    );
}
