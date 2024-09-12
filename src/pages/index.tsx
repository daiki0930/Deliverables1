import { Box, Text, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import styles from '../styles/Login.module.css';

const Index = () => {
    const router = useRouter();

    return (
        <Box className={ styles.background_login }>
          <Box background="white" position="absolute" top="20px" width="100%" textAlign="center">
            <Text fontSize="40px" fontWeight="bold" color="red">
              ポートフォリオサイトです。
            </Text>
            <Text fontSize="40px" fontWeight="bold" color="red">
              ここから先をご覧いただくには会員登録をお願いします。
            </Text>
          </Box>
            <Box display="flex" justifyContent="center" mt="10">
                <Button
                  className={ styles.button1 }
                  onClick={() => router.push('/Research/FirebaseSignIn')}
                  mr={4}
                >新規登録の方はこちら
                </Button>
                <Button
                  className={ styles.button1 }
                  onClick={() => router.push('/Research/FirebaseLogin')}
                >ログインの方はこちら
                </Button>
            </Box>
        </Box>
    );
};

export default Index;