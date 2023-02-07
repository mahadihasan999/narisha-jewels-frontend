import React from "react";

const About = () => {
  return (
    <div className="py-24">
      <div className="overflow-y-hidden container mx-auto">
        <div className="pb-16" style={{ fontFamily: '"Lato", sans-serif' }}>
          <section>
            <div className="flex items-center flex-col">
              <h1 className="text-3xl sm:text-3xl xl:text-4xl font-semibold leading-6 pb-2">
                About Us
              </h1>
            </div>
          </section>
          <dh-component>
            <section className="mx-auto container bg-white pt-2">
              <div className="px-4 lg:px-0">
                <div
                  role="contentinfo"
                  className="flex items-center flex-col px-4"
                >
                  <h1
                    tabIndex={0}
                    className="focus:outline-none text-4xl lg:text-4xl pt-4 font-extrabold text-center leading-tight text-gray-800 lg:w-7/12 md:w-9/12 xl:w-5/12"
                  >
                    Narisha Jewels
                  </h1>
                  <p>About Our Brand</p>
                </div>
              </div>

              <p className="mx-20 py-5 text-gray-700 text-xl">
                Narisha JEWELLERS is a gold jewelry brand established in
                Bangladesh. Since 2000 it’s providing the best and luxurious
                gold jewelry ornaments with unique designs all over the
                world-wide customers. We are one of the oldest business families
                in Bangladesh with a family legacy of over a century in
                business, starting from as early as 2000. We have always
                believed that the customer needs to be educated and aware, as
                this is the first step in preventing malpractices in business.
                As a part of this philosophy, we have conducted several
                campaigns over the years, to educate customers about purity,
                pricing, and other aspects. These efforts of our company have
                gone a long way in the industry, which is now becoming more
                transparent towards the customer’s interests. We believe that
                this is our legacy to the industry. AtNarisha JEWELLERS, we take
                great pride in offering an unparalleled retail experience that
                takes into consideration our every customer’s unique gold needs
                and preferences. Our trained servicemen have extensive knowledge
                about the gold jewelry they showcase and strive to deliver
                excellence, consistently.
              </p>
            </section>

            <h1 className="text-2xl  w-full bg-indigo-500 px-2 text-white">
              HAVE A LOOK TO ALL OF OUR POLICIES
            </h1>
            <section className="flex justify-start item-center gap-2 py-2 flex-col">
              <h1 className="text-2xl">Who we are </h1>
              <p>
                We are one of the top imitation jewelry products seller importer
                and manufacturer of Bangladesh. We are BD Jewelers || Quality is
                the first priority.
              </p>
              <h1 className="text-2xl">
                {" "}
                What personal data we collect and why we collect it
              </h1>
              <h1 className="text-2xl"> Your contact information</h1>
              <p className="text-gray-700">
                We collect your contact information like Name, Email, Phone
                Number, Home address etc for create your personal account to our
                website. Your personal account use for only of you to place any
                order in our website. We need this for delivery your product(s)
                to your desire location. Also any kinds of other activity (Like
                commenting, opinion sharing, product ratings etc) to our website
                can be recorded with this information.
              </p>
              <h1 className="text-2xl text-gray-700">Comments and ratings </h1>
              <p className="text-gray-700">
                When visitors/customers leave comments on our website we collect
                the data shown in the comments form, and also the visitor’s IP
                address and browser user agent string to help spam detection. If
                you are not register visitor to our website an anonymized string
                created from your email address is visible to the public in the
                context of your comment.
              </p>
              <h1 className="text-2xl text-gray-700">
                Who we share your data with{" "}
              </h1>
              <p className="text-gray-700">
                If you buy any product or service from our website we provide
                your specific data to some 3rd party like Courier service,
                Payment getaway, Government administration. We provide your only
                contact details to courier service to delivery your products. We
                provide only your order amount and order id to payment getaway
                for pay your order price. If any government administration need
                to take your any kinds of personal data for any investigation we
                will provide them.
              </p>
              <h1 className="text-2xl text-gray-700">
                {" "}
                How long we retain your data
              </h1>
              <p className="text-gray-700">
                If you leave a comment or rating, the comment or rating and its
                metadata are retained indefinitely. This is so we can recognize
                and approve any follow-up comments automatically instead of
                holding them in a moderation queue. Some time we hold it in
                moderation for stop spamming. For users that register on our
                website (if any), we also store the personal information they
                provide in their user profile. All users can see, edit, or
                delete their personal information at any time (except they
                cannot change their username). Website administrators can also
                see and edit that information. If anyone need to remove there
                data from our database we will remove his/her data as per users
                request.
              </p>
              <h1 className="text-2xl text-gray-700">
                What rights you have over your data{" "}
              </h1>
              <p className="text-gray-700">
                If you have an account on this site, or have left comments,
                ratings, orders, you can request to receive an exported file of
                the personal data we hold about you, including any data you have
                provided to us. You can also request that we erase any personal
                data we hold about you. This does not include any data we are
                obliged to keep for administrative, legal, or security purposes.
              </p>
            </section>
            <section className="flex justify-start item-center gap-2 py-2 flex-col">
              <h1 className="text-2xl text-gray-100 w-full bg-indigo-500 px-2">
                {" "}
                Replace Policy
              </h1>
              <hr />
              <h1 className="text-2xl text-gray-700">
                The reason for the replacement{" "}
              </h1>
              <p className="text-gray-700">
                The product will be replaced if the image of the ordered product
                does not match with the product received, if the product
                received is defective or broken or if all accessories are not
                available with the product.
              </p>
              <h1 className="text-2xl text-gray-700">
                {" "}
                Required documents for replace
              </h1>
              <p className="text-gray-700">
                In order to request a replace, you must have provide some
                information as proof of product error, notably unboxing videos,
                images, etc. Unboxing video must be provided if the product is
                broken or incomplete delivery. Pictures will only be accepted
                for color issues.
              </p>
            </section>
            <section className="flex justify-start item-center gap-2 py-2 flex-col">
              <h1 className="text-2xl text-gray-100 w-full bg-indigo-500 px-2 ">
                {" "}
                Refund Policy
              </h1>
              <hr />
              <h1 className="text-2xl text-gray-700">
                The reason for the refund
              </h1>
              <p className="text-gray-700">
                If your reason is match with replace policy and we are unable to
                delivered your desired product within our committed time. We
                will refund your payment. In case of advance payment, if your
                ordered product fails to be delivered within the stipulated time
                or the product is out of stock, your paid amount will be
                refunded.
              </p>
              <h1 className="text-2xl text-gray-700"> How to refund</h1>
              <p className="text-gray-700">
                To get the refund, you have to fill the application form given
                in the following link along with proper argument and proof.
                After reviewing your request if it is true then your refund will
                be send to to your mobile banking or bank account number within
                3 working days.
              </p>
              <h1 className="text-2xl text-gray-700">
                Reason for not be refunded
              </h1>
              <p className="text-gray-700">
                No refund will be given if for any reason your argument is not
                correct or if the order is canceled by changing the opinion
                after the order in case of advanced payment.
              </p>
            </section>
          </dh-component>
          {/* Code block ends */}
        </div>
      </div>
    </div>
  );
};

export default About;
