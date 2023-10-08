Check list

-   Which features most affect the price of a home over time?

-   Gather all the features from Zillow

    -   Get API key from Zillow

    -   Build the backend logic to gather data from Zillow

    -   Store the data in our own database

        -   Create the model for our database

        -   Store data in our database as we collect it

-   Create web application which allows users to check if a home will appreciate or not

    -   Create React Application

        -   Build frontend with different features

            -   Create home screen

                -   Function to train predictive model

                    -   Option to train predictive model generally

                    -   Option to specify state & city to train model against

                        -   Should be an input box with dropdown list

                        -   If data does not exist, ask user to import it

                -   Textbox for current price, rent, bedrooms, bathroom, sq/ft, & address

                -   Display the projected price, rent, and appreciation percentage

        -   Build backend

            -   Connect database to backend

                -   Setup MySQL database model

            -   Create predictive model

                -   Create function to update predict model

                    -   Initialize model if it does not exist

                -   Pull database model to create predictive model

                -   Store predictive model for future use

            -   Run user given data features against predictive model

                -   Connect frontend to backend

                -   Return projected price, appreciation percentage, and rent

-   Make a model that predicts if a house will appreciate over 10% in the next year, renting price prediction, maybe neighborhood analysis, what the current price.

    -   Deploy this into an interactive website that can be used by realtors, rental property buyers/sellers or homebuyers.
