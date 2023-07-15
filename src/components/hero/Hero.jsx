import  { useEffect, useState } from 'react';
import { Modal, ModalBody, Row } from 'reactstrap';
import heroImg from '../../assets/hero-img.png';
import PropTypes from 'prop-types';
import './Hero.css';

const Hero = ({ state }) => {
  const [modal, setModal] = useState(false);
  const [description, setDescription] = useState('');
  const [setCid] = useState('');

  useEffect(() => {
    const { contract } = state;
    const descriptionText = async () => {
      const descriptionText = await contract.methods.description().call();
      setDescription(descriptionText);
    };
    contract && descriptionText();
  }, [state]);

  useEffect(() => {
    const { contract } = state;
    const cidOfImage = async () => {
      const cid = await contract.methods.imageLink().call();
      setCid(cid);
    };
    contract && cidOfImage();
  }, [setCid, state]);

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-text">
          <p>
            <span> <h3>Blockchain Developer From India.</h3> </span>
          </p>
          <h2>Unlocking the Potential of Web3 with Decentralized App Development.</h2>
          <h3>{description}</h3>

          <Modal size="md" isOpen={modal} toggle={() => setModal(!modal)}>
            <ModalBody>
              <Row className="text-align">
                <label htmlFor="">
                  Mail Id - gujaratirutvik007@gmail.com
                </label>
              </Row>
            </ModalBody>
          </Modal>

          <button className="msg-btn" onClick={() => setModal(true)}>
            Get in Touch
          </button>
        </div>

        <div className="hero-img">
          <div className="img-container">
            <img src={heroImg} alt="profilePhoto" />
          </div>
        </div>
      </div>
    </section>
  );
};
Hero.propTypes = {
    state: PropTypes.object.isRequired,
  };


export default Hero;
