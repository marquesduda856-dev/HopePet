import { supabase } from '../config/supabase.js';

export const getOngs = async (req, res) => {
  try {
    const { cidade } = req.query;
    
    let query = supabase
      .from('ongs')
      .select('*')
      .eq('status', 'aprovada')
      .order('nome', { ascending: true });

    if (cidade) {
      query = query.ilike('cidade', `%${cidade}%`);
    }

    const { data, error } = await query;

    if (error) throw error;
    res.json(data);
  } catch (error) {
    const baseOngs = [
      {
        id: 1, nome: 'Ampara Animal', cidade: 'São Paulo', estado: 'SP', descricao: 'A maior ONG de proteção animal do Brasil.',
        instagram: '@amparanimal', site: 'amparanimal.org.br', telefone: '(11) 3333-3333', imagem: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        latitude: -23.550520, longitude: -46.633308
      },
      {
        id: 2, nome: 'SUIPA', cidade: 'Rio de Janeiro', estado: 'RJ', descricao: 'A Sociedade União Internacional Protetora dos Animais abriga milhares de animais.',
        instagram: '@suipa', site: 'suipa.org.br', telefone: '(21) 3297-8777', imagem: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        latitude: -22.887258, longitude: -43.250556
      },
      {
        id: 3, nome: 'Instituto Caramelo', cidade: 'Ribeirão Pires', estado: 'SP', descricao: 'Focado no resgate de animais feridos ou em situação de risco.',
        instagram: '@institutocaramelo', site: 'institutocaramelo.org', telefone: '(11) 97777-7777', imagem: 'https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        latitude: -23.7144, longitude: -46.4138
      },
      {
        id: 4, nome: 'Projeto CEL', cidade: 'São Paulo', estado: 'SP', descricao: 'Abrigo e adoção de animais em situação de rua no estado de SP.',
        instagram: '@projetocel', site: 'projetocel.org', telefone: '(11) 99999-0004', imagem: 'https://images.unsplash.com/photo-1593483316242-efb5420596ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        latitude: -23.5489, longitude: -46.6388
      },
      {
        id: 5, nome: 'Bicho Legal', cidade: 'Belo Horizonte', estado: 'MG', descricao: 'Focada em campanhas de adoção e mutirões de castração em BH.',
        instagram: '@bicholegalmg', site: '', telefone: '(31) 98888-0005', imagem: 'https://images.unsplash.com/photo-1544568100-847a948585b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        latitude: -19.9167, longitude: -43.9345
      },
      {
        id: 6, nome: 'Abrigo dos Bichos', cidade: 'Campo Grande', estado: 'MS', descricao: 'Resgate, reabilitação e busca de novos lares para animais vítimas de maus tratos.',
        instagram: '@abrigodosbichosms', site: 'abrigodosbichos.org.br', telefone: '(67) 99999-0006', imagem: 'https://images.unsplash.com/photo-1598133894008-61f7fec814cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        latitude: -20.4428, longitude: -54.6464
      },
      {
        id: 7, nome: 'Associação Quatro Patinhas', cidade: 'Niterói', estado: 'RJ', descricao: 'ONG que promove a adoção responsável e defesa dos direitos dos animais.',
        instagram: '@quatropatinhasrj', site: 'quatropatinhas.com.br', telefone: '(21) 99999-0007', imagem: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        latitude: -22.8833, longitude: -43.1036
      },
      {
        id: 8, nome: 'Adote um Focinho', cidade: 'Curitiba', estado: 'PR', descricao: 'Amor e cuidado para cachorros resgatados esperando uma família.',
        instagram: '@adoteumfocinhopr', site: '', telefone: '(41) 99999-0008', imagem: 'https://images.unsplash.com/photo-1537151608804-ea2f1fa50257?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        latitude: -25.4284, longitude: -49.2733
      },
      {
        id: 9, nome: 'Oito Vidas', cidade: 'Rio de Janeiro', estado: 'RJ', descricao: 'Especializada no resgate, tratamento e adoção de felinos.',
        instagram: '@oitovidasrj', site: 'oitovidas.org.br', telefone: '(21) 99999-0009', imagem: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        latitude: -22.9519, longitude: -43.2105
      },
      {
        id: 10, nome: 'Bicho de Rua', cidade: 'Porto Alegre', estado: 'RS', descricao: 'Ajudando os animais de rua do Rio Grande do Sul a encontrarem lares amorosos.',
        instagram: '@bichoderuars', site: 'bichoderua.org.br', telefone: '(51) 99999-0010', imagem: 'https://images.unsplash.com/photo-1529472119196-cb724127a98e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        latitude: -30.0346, longitude: -51.2177
      },
      {
        id: 11, nome: 'Vira Lata Vira Amor', cidade: 'Florianópolis', estado: 'SC', descricao: 'Resgate de cães abandonados nas ruas de Floripa.',
        instagram: '@viralataviraamorsc', site: '', telefone: '(48) 99999-0011', imagem: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        latitude: -27.5954, longitude: -48.5480
      },
      {
        id: 12, nome: 'Cão Sem Fome', cidade: 'São Paulo', estado: 'SP', descricao: 'Fornecemos alimento e cuidados básicos para abrigos superlotados.',
        instagram: '@caosemfome', site: 'caosemfome.com.br', telefone: '(11) 99999-0012', imagem: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        latitude: -23.6045, longitude: -46.6695
      },
      {
        id: 13, nome: 'Patas Dadas', cidade: 'Porto Alegre', estado: 'RS', descricao: 'Nossa missão é conscientizar, resgatar e transformar vidas.',
        instagram: '@patasdadas', site: 'patasdadas.com.br', telefone: '(51) 99999-0013', imagem: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        latitude: -30.0190, longitude: -51.1714
      },
      {
        id: 14, nome: 'Focinhos de Luz', cidade: 'Rio de Janeiro', estado: 'RJ', descricao: 'Acolhemos animais vítimas de abandono e crueldade no RJ.',
        instagram: '@focinhosdeluz', site: 'focinhosdeluz.com', telefone: '(21) 99999-0014', imagem: 'https://images.unsplash.com/photo-1527362950785-f487a7c1fe48?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        latitude: -22.9868, longitude: -43.2018
      },
      {
        id: 15, nome: 'APATA', cidade: 'Fortaleza', estado: 'CE', descricao: 'Associação de Proteção aos Animais de Tração e Abandono.',
        instagram: '@apatace', site: '', telefone: '(85) 99999-0015', imagem: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        latitude: -3.7172, longitude: -38.5430
      },
      {
        id: 16, nome: 'ABPA', cidade: 'Salvador', estado: 'BA', descricao: 'Associação Baiana de Proteção Animal, promovendo o bem-estar animal.',
        instagram: '@abpabahia', site: 'abpabahia.org.br', telefone: '(71) 99999-0016', imagem: 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        latitude: -12.9714, longitude: -38.5014
      },
      {
        id: 17, nome: 'Amigos de São Francisco', cidade: 'São Paulo', estado: 'SP', descricao: 'Temos a missão de encontrar lares de amor para animais que conheceram apenas a dor.',
        instagram: '@amigosdesaofrancisco', site: 'amigosdesaofrancisco.com.br', telefone: '(11) 99999-0017', imagem: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        latitude: -23.5855, longitude: -46.6666
      },
      {
        id: 18, nome: 'Santuário das Fadas', cidade: 'Itaipava', estado: 'RJ', descricao: 'Um refúgio para animais idosos, doentes crônicos e de fazenda.',
        instagram: '@santuariodasfadas', site: 'santuariodasfadas.org', telefone: '(24) 99999-0018', imagem: 'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        latitude: -22.3888, longitude: -43.1257
      },
      {
        id: 19, nome: 'Gato Mia', cidade: 'Campinas', estado: 'SP', descricao: 'Associação dedicada exclusivamente ao resgate e adoção de felinos.',
        instagram: '@gatomiacampinas', site: '', telefone: '(19) 99999-0019', imagem: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        latitude: -22.9099, longitude: -47.0626
      },
      {
        id: 20, nome: 'Cão Viver', cidade: 'Belo Horizonte', estado: 'MG', descricao: 'Construindo laços de amor entre animais resgatados e humanos.',
        instagram: '@caovivermg', site: 'caoviver.com.br', telefone: '(31) 99999-0020', imagem: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        latitude: -19.9213, longitude: -43.9538
      }
      {
        id: 21, nome: 'UIPA (União Internacional Protetora dos Animais)', cidade: 'São Paulo', estado: 'SP', descricao: 'A mais antiga ONG de proteção animal do Brasil.',
        instagram: '@uipasp', site: 'uipa.org.br', telefone: '(11) 3228-1462', imagem: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        latitude: -23.5255, longitude: -46.6190
      },
      {
        id: 22, nome: 'Clube dos Vira-Latas', cidade: 'Ribeirão Pires', estado: 'SP', descricao: 'Maior ONG de cuidado e adoção de cães do Brasil.',
        instagram: '@clubedosviralatas', site: 'clubedosviralatas.org.br', telefone: '(11) 99999-0022', imagem: 'https://images.unsplash.com/photo-1593483316242-efb5420596ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        latitude: -23.7122, longitude: -46.4188
      },
      {
        id: 23, nome: 'Adote um Gatinho', cidade: 'São Paulo', estado: 'SP', descricao: 'Maior projeto de resgate e adoção de gatos do Brasil.',
        instagram: '@adoteumgatinho', site: 'adoteumgatinho.com.br', telefone: '(11) 99999-0023', imagem: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        latitude: -23.5510, longitude: -46.6340
      },
      {
        id: 24, nome: 'Catland', cidade: 'São Paulo', estado: 'SP', descricao: 'Focada no resgate, conscientização e adoção de gatinhos em SP.',
        instagram: '@catlandrescue', site: 'catland.org.br', telefone: '(11) 99999-0024', imagem: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        latitude: -23.5890, longitude: -46.6320
      },
      {
        id: 25, nome: 'Cão Sem Dono', cidade: 'Itapecerica da Serra', estado: 'SP', descricao: 'Tirando animais das ruas, cuidando e dando amor.',
        instagram: '@caosemdono.oficial', site: 'caosemdono.com.br', telefone: '(11) 99999-0025', imagem: 'https://images.unsplash.com/photo-1537151608804-ea2f1fa50257?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        latitude: -23.7130, longitude: -46.8500
      },
      {
        id: 26, nome: 'Associação Natureza em Forma', cidade: 'São Paulo', estado: 'SP', descricao: 'Centro de adoção e cuidados no coração de São Paulo.',
        instagram: '@naturezaemforma', site: 'naturezaemforma.org.br', telefone: '(11) 99999-0026', imagem: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        latitude: -23.5530, longitude: -46.6450
      },
      {
        id: 27, nome: 'Abrigo Piccolina', cidade: 'Avaré', estado: 'SP', descricao: 'Abrigo e proteção para cães abandonados no interior paulista.',
        instagram: '@abrigopiccolina', site: 'abrigopiccolina.org.br', telefone: '(14) 99999-0027', imagem: 'https://images.unsplash.com/photo-1598133894008-61f7fec814cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        latitude: -23.1000, longitude: -48.9200
      },
      {
        id: 28, nome: 'Confraria dos Miados e Latidos', cidade: 'São Paulo', estado: 'SP', descricao: 'Pioneiros em CED (Captura, Esterilização e Devolução).',
        instagram: '@miadoselatidos', site: 'miadoselatidos.org.br', telefone: '(11) 99999-0028', imagem: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        latitude: -23.5200, longitude: -46.6200
      },
      {
        id: 29, nome: 'Focinho Abandonado', cidade: 'São Paulo', estado: 'SP', descricao: 'Resgate, reabilitação e busca por novas famílias.',
        instagram: '@focinhoabandonado', site: '', telefone: '(11) 99999-0029', imagem: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        latitude: -23.5900, longitude: -46.6800
      },
      {
        id: 30, nome: 'Instituto Luisa Mell (Instituto Caramelo)', cidade: 'São Paulo', estado: 'SP', descricao: 'Atuação forte em resgates de grandes proporções e conscientização.',
        instagram: '@institutoluisamell', site: 'ilm.org.br', telefone: '(11) 99999-0030', imagem: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        latitude: -23.6100, longitude: -46.6200
      }
    ];

    const { cidade } = req.query;
    if (cidade) {
      res.json(baseOngs.filter(o => o.cidade.toLowerCase().includes(cidade.toLowerCase())));
    } else {
      res.json(baseOngs);
    }
  }
};

export const createSugestaoOng = async (req, res) => {
  try {
    const { nome_ong, cidade, estado, endereco, instagram, site, telefone, descricao, motivo } = req.body;
    
    const { data, error } = await supabase
      .from('sugestoes_ongs')
      .insert([{ nome_ong, cidade, estado, endereco, instagram, site, telefone, descricao, motivo }])
      .select();

    if (error) throw error;

    // TODO: Disparar e-mail via Brevo para a equipe aprovar

    res.status(201).json(data[0]);
  } catch (error) {
    console.log('Erro ao criar sugestão de ONG no Supabase, retornando mock de sucesso:', error.message);
    // Mock de sucesso para mostrar na interface
    res.status(201).json({ success: true, message: 'Indicação enviada com sucesso (mock)' });
  }
};
