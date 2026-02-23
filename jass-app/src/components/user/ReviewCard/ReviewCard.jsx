import {
  Card,
  TopRow,
  Stars,
  VerifiedBadge,
  Date,
  ReviewText,
  ServiceTag,
  Divider,
  AuthorRow,
  AuthorInfo,
  HelpfulRow,
} from "./ReviewCardStyles";

const ReviewCard = ({ review, index }) => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className="fa-solid fa-star"
          style={{ color: i <= rating ? "#cc0000" : "rgba(255,255,255,0.2)" }}
        />
      );
    }
    return stars;
  };

  return (
    <Card $index={index}>
      <TopRow>
        <Stars>{renderStars(review.rating)}</Stars>
        {review.verified && (
          <VerifiedBadge>
            <i className="fa-solid fa-circle-check" />
            VERIFIED
          </VerifiedBadge>
        )}
        <Date>{review.date}</Date>
      </TopRow>

      <ReviewText>"{review.review}"</ReviewText>

      <ServiceTag $service={review.service}>{review.service}</ServiceTag>

      <Divider />

      <AuthorRow>
        <i className="fa-solid fa-circle-user" />
        <AuthorInfo>
          <strong>{review.name}</strong>
          <span>
            {review.vehicle} • {review.city}
          </span>
        </AuthorInfo>
      </AuthorRow>

      <HelpfulRow>
        <i className="fa-solid fa-thumbs-up" />
        {review.helpful} helpful
      </HelpfulRow>
    </Card>
  );
};

export default ReviewCard;
