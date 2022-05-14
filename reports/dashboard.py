import requests
import streamlit as st
import streamlit_authenticator as stauth
import pandas as pd
import streamlit as st
from st_aggrid import AgGrid, GridOptionsBuilder
from st_aggrid.shared import GridUpdateMode
from pymongo import MongoClient


# start auth
client = MongoClient("mongodb+srv://reports:reports@cluster0.3z5dy.mongodb.net/epg?retryWrites=true&w=majority")
mydb = client["epg"]
mycol = mydb["employers"]
db = client.epg
collection = db.employers
data = pd.DataFrame(list(collection.find()))
gran_total = collection.count_documents({})
print("Grand total records: {}".format(gran_total))

names = ['John Smith','Rebecca Briggs']
usernames = ['ian','rbriggs']
passwords = ['123','456']
hashed_passwords = stauth.hasher(passwords).generate()
authenticator = stauth.authenticate(names,usernames,hashed_passwords,
    'some_cookie_name','some_signature_key',cookie_expiry_days=30)
name, authentication_status = authenticator.login('Login','main')
if authentication_status:
    endpoint = st.sidebar.selectbox("Endpoints", ['Total Employers'])
    st.write(f"Reports Dashboard - {endpoint}")

    st.sidebar.subheader("Filters")

    collection = st.sidebar.text_input("Collection")
    owner = st.sidebar.text_input("Owner (address)")

   
    if endpoint == 'Total Employers':
        iris = pd.read_csv(
            "https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv"
        )

        def aggrid_interactive_table(df: pd.DataFrame):
            """Creates an st-aggrid interactive table based on a dataframe.

            Args:
                df (pd.DataFrame]): Source dataframe

            Returns:
                dict: The selected row
            """
            options = GridOptionsBuilder.from_dataframe(
                df, enableRowGroup=True, enableValue=True, enablePivot=True
            )

            options.configure_side_bar()

            options.configure_selection("single")
            selection = AgGrid(
                df,
                enable_enterprise_modules=True,
                gridOptions=options.build(),
                theme="dark",
                update_mode=GridUpdateMode.MODEL_CHANGED,
                allow_unsafe_jscode=True,
            )

            return selection


        iris = pd.read_csv(
            "https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv"
        )
        iris.title = "THIS"
        selection = aggrid_interactive_table(df=data)

        if selection:
            st.write("You selected:")
            st.json(selection["selected_rows"])
        import justpy as jp
        import pandas as pd

        #wm = pd.read_csv('https://elimintz.github.io/women_majors.csv').round(2)
        #wm_under_20 = wm[wm.loc[0, wm.loc[0] < 20].index]
        #wm_under_20.insert(0, 'Year', wm['Year'])

        def grid_test():
            wp = jp.WebPage()
            data.jp.ag_grid(a=wp)
            #wm_under_20.jp.ag_grid(a=wp)
            return wp

        jp.justpy(grid_test)
            
elif authentication_status == False:
    st.error('Username/password is incorrect')
elif authentication_status == None:
    st.warning('Please enter your username and password')

# end auth