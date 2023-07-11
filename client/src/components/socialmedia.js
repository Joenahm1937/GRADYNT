import { SocialIcon } from 'react-social-icons';
import { TWITTER_LINK } from '../constants'

const SocialMedia = () => {
    return (
        <div className="SocialMedia">
            <SocialIcon url={TWITTER_LINK} bgColor="#fff" />
        </div>
    );
}

export default SocialMedia;