import React from 'react';
import { Card } from 'react-bootstrap';

const FaqScreen = () => {
  const faqs = [
    { question: 'Why should I pay for the content I want to see?', answer: 'Each money you give can be considered as donations to the Author whom you support and helps encourages them to create more contents. Our site is meant to encourage the talents of our authors through giving them donations so that they can build a career out of their hobby.' },
    { question: 'How would I know if my subscription is ending?', answer: 'You can find that information in your profile page. It shows when your next subscription payment will occur and what tier you have chose. You can cancel your subscription anytime.' },
    { question: 'Where can I find the content I want to see?', answer: 'You can find it under the READ NOW tab and you can only see contents that are posted under your subscription plan. If there is a specific genre you like, You can go to the GENRE tab where all types of genre can be seen.' },
  ];

  return (
    <div className="container-fluid">
      <div className="text-center mt-4">
        <h1 className="display-4">Frequently Asked Questions</h1>
      </div>
      <br></br>
      <div className="row justify-content-center">
        {faqs.map((faq, index) => (
          <div className="col-md-8 my-3" key={index}>
            <Card border="dark" className="h-100">
              <Card.Header className="text-center">{faq.question}</Card.Header>
              <Card.Body className="d-flex flex-column justify-content-center">
                <Card.Text className="text-center">{faq.answer}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqScreen;