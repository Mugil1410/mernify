export default function ProductReview({ reviews, user }) {
  
  const currentUserReviews = user ? reviews.filter(review => review.user._id === user._id) : [];
  const otherUserReviews = user ? reviews.filter(review => review.user._id !== user._id) : reviews;

  const hasCurrentUserReviews = currentUserReviews.length > 0;
  const hasOtherUserReviews = otherUserReviews.length > 0;

  return (
    <div className="reviews w-75">
      {user ? (
        <>
          {hasCurrentUserReviews && (
            <>
              <h3>Your Review:</h3>
              {currentUserReviews.map(review => (
                <div key={review._id} className="review-card my-3">
                  <div className="rating-outer">
                    <div className="rating-inner" style={{ width: `${(review.rating / 5) * 100}%` }}></div>
                  </div>
                  <p className="review_user">by {review.user.name}</p>
                  <p className="review_comment">{review.comment}</p>
                  <hr />
                </div>
              ))}
            </>
          )}
          {hasOtherUserReviews && (
            <>
              <h3>Other's Reviews:</h3>
              <hr />
              {otherUserReviews.map(review => (
                <div key={review._id} className="review-card my-3">
                  <div className="rating-outer">
                    <div className="rating-inner" style={{ width: `${(review.rating / 5) * 100}%` }}></div>
                  </div>
                  <p className="review_user">by {review.user.name}</p>
                  <p className="review_comment">{review.comment}</p>
                  <hr />
                </div>
              ))}
            </>
          )}
        </>
      ) : (
        <>
          <h3>All Reviews:</h3>
          <hr />
          {reviews.map(review => (
            <div key={review._id} className="review-card my-3">
              <div className="rating-outer">
                <div className="rating-inner" style={{ width: `${(review.rating / 5) * 100}%` }}></div>
              </div>
              <p className="review_user">by {review.user.name}</p>
              <p className="review_comment">{review.comment}</p>
              <hr />
            </div>
          ))}
        </>
      )}
    </div>
  );
}
