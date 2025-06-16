// component for displaying the about page for college

import React from "react";
interface objectProps {
    College_name : string, 
    Highlights : string,
    Courses : string,
    Fees : string,
    Placements : string,
    Scholarships : string,
    Reviews : string
    AdmissionProcess : string,
}

export default function CollegeAbout(
    {
        College_name,
        Highlights,
        Courses,
        AdmissionProcess,
        Fees,
        Placements,
        Scholarships,
        Reviews
    }: objectProps

) {
    return (
      <div>

          <div id="college-info" className="mt-6 p-4 bg-gray-900 text-white shadow-lg rounded-lg max-w-3xl">
              <h2 className="text-xl font-semibold">{College_name} Highlights 2024</h2>
              <p className="mt-2 text-gray-300 text-justify">{Highlights}</p>
          </div>

          {/* Courses  */}

          <div id="courses" className="mt-6 p-4 bg-gray-900 text-white shadow-lg rounded-lg max-w-3xl">
              <h2 className="text-xl font-semibold">Courses</h2>
              {/* <p className="mt-2 text-gray-300 text-justify">{Courses}</p> */}
              <div className="mt-2 text-gray-300 text-justify" dangerouslySetInnerHTML={{ __html: Courses }} />

          </div>

          {/* Admission Process */}
          <div id="admissions" className="mt-6 p-4 bg-gray-900 text-white shadow-lg rounded-lg max-w-3xl">
              <h2 className="text-xl font-semibold">{College_name} Admission Process and Important Dates 2024</h2>
              <div className="mt-2 text-gray-300 text-justify" dangerouslySetInnerHTML={{ __html: AdmissionProcess }} />

          </div>

          {/* Fees */}

          <div id="fees" className="mt-6 p-4 bg-gray-900 text-white shadow-lg rounded-lg max-w-3xl">
              <h2 className="text-xl font-semibold">Fees</h2>
              <div className="mt-2 text-gray-300 text-justify" dangerouslySetInnerHTML={{ __html: Fees }} />
          </div>

          {/* Placements */}

          <div id="placements" className="mt-6 p-4 bg-gray-900 text-white shadow-lg rounded-lg max-w-3xl">
              <h2 className="text-xl font-semibold">Placements</h2>
              <div className="mt-2 text-gray-300 text-justify" dangerouslySetInnerHTML={{ __html: Placements }} />
          </div>

          {/* Scholarships */}

          <div id="scholarships" className="mt-6 p-4 bg-gray-900 text-white shadow-lg rounded-lg max-w-3xl">
              <h2 className="text-xl font-semibold">Scholarships</h2>
              <div className="mt-2 text-gray-300 text-justify" dangerouslySetInnerHTML={{ __html: Scholarships }} />
          </div>

          {/* reviews */}

          <div id="reviews" className="mt-6 p-4 bg-gray-900 text-white shadow-lg rounded-lg max-w-3xl">
              <h2 className="text-xl font-semibold">reviews</h2>
              <p className="mt-2 text-gray-300 text-justify">{Reviews}</p>
          </div>
      </div>

    );

}