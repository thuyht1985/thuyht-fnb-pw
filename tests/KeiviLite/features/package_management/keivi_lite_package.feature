Feature: Gói dịch vụ Keivi Lite
  Epic: https://citigo.atlassian.net/browse/FNB-78323
  Business Goal: Phục vụ phân khúc khách hàng nhỏ lẻ với gói dịch vụ cơ bản, giá phải chăng nhưng đầy đủ tính năng thiết yếu
  Business Rules:
    - Gói Keivi Lite chỉ hiển thị cho brand "Keivi" 
    - Giới hạn: 3 người dùng tối đa, 1 chi nhánh tối đa
    - Ẩn các module: Nhân viên, Bán online, Báo cáo phân tích, Lễ tân, Màn hình Bếp, Public API, Food App
    - Trong Thiết lập ẩn: SMS-Email, Khuyến mại, Tích điểm      

  Background:
    Given người dùng đã đăng nhập vào hệ thống keivi với gian hàng "thuy0311" và tài khoản "admin"
  # 1. Gói Keivi Lite chỉ hiển thị cho brand "Keivi" (tất cả quốc gia)
  
  Scenario: Chỉ hiển thị gói Keivi lite cho gian hàng Keivi
    When người dùng vào trang màn hình chọn gói dịch vụ
    Then người dùng nhìn thấy gói dịch vụ Keivi lite

  Scenario: Không hiển thị gói Keivi lite cho gian hàng Kiotviet
    Given người dùng đã đăng nhập vào hệ thống với gian hàng Kiotviet
    When người dùng vào trang màn hình chọn gói dịch vụ
    Then người dùng không nhìn thấy gói dịch vụ Keivi lite
  # 2. Giới hạn: 3 người dùng tối đa, 1 chi nhánh tối đa

  Scenario: Không cho phép tạo thêm chi nhánh
    Given gian hàng đang sử dụng gói Keivi lite và có 1 chi nhánh active
    When người dùng tạo chi nhánh mới
    Then hiển thị thông báo lỗi "đã đạt giới hạn chi nhánh"

  Scenario: Chuyển gói từ nhiều chi nhánh sang keivi lite
    Given gian hàng đang sử dụng gói Keivi standard và có 3 chi nhánh active
    When gian hàng chuyển gói từ Keivi standard sang Keivi lite
    And người dùng vào màn hình quản lý chi nhánh
    Then Chỉ active chi nhánh tạo đầu tiên các chi nhánh còn lại inactive

  Scenario Outline: Không phép active chi nhánh nếu active chi nhánh <= 1
    Given gian hàng đang sử dụng gói Keivi lite
    And và có {active_branch} chi nhánh active và {inactive_branch} inactive
    When cho phép hoạt động chi nhánh inactive
    Then không cho phép hoạt động chi nhánh

    Examples:
      | active_branch | inactive_branch |
      |             1 |               0 |
      |             1 |               1 |

  Scenario Outline: Tạo mới thành công khi số lượng người dùng active < 3
    Given gian hàng đang sử dụng gói Keivi lite
    And và có {active_users} người dùng active và {inactive_users} inactive
    When thêm người dùng mới
    Then thêm người dùng mới thành công

    Examples:
      | active_users | inactive_users |
      |            1 |              0 |
      |            2 |              1 |

  Scenario Outline: Không cho phép tạo thêm người dùng khi có số lượng người dùng active >= 3
    Given gian hàng đang sử dụng gói Keivi lite
    And và có {active_users} người dùng active và {inactive_users} inactive
    When thêm người dùng mới
    Then hiển thị thông báo lỗi "đã đạt giới hạn người dùng"

    Examples:
      | active_users | inactive_users |
      |            3 |              0 |
      |            3 |              1 |

  Scenario Outline: Cho phép active user nếu active user < 3
    Given gian hàng đang sử dụng gói Keivi lite
    And và có {active_users} người dùng active và {inactive_users} inactive
    When cho phép hoạt động người dùng inactive
    Then cho phép hoạt động người dùng thành công

    Examples:
      | active_users | inactive_users |
      |            1 |              1 |
      |            1 |              2 |
      |            2 |              1 |

  Scenario Outline: Không cho phép active user nếu người dùng active >= 3
    Given gian hàng đang sử dụng gói Keivi lite
    And và có {active_users} người dùng active và {inactive_users} inactive
    When cho phép hoạt động người dùng inactive
    Then hiển thị thông báo lỗi "đã đạt giới hạn người dùng"

    Examples:
      | active_users | inactive_users |
      |            3 |              1 |

@web
  Scenario: Chuyển gói có người dùng active > 3 sang keivi lite
    Given gian hàng đang sử dụng gói Keivi "Lite"
    And gian hàng có 4 người dùng active
    When gian hàng chuyển gói từ Keivi standard sang Keivi lite
    And người dùng vào màn hình quản lý người dùng
    Then Chỉ active admin user và 2 người dùng được tạo sớm nhất

  # 3. Ẩn các module: Nhân viên, Bán online, Báo cáo phân tích, Lễ tân, Màn hình Bếp, Public API, Food App
  Scenario: Không cho phép sử dụng các tính năng Nhân viên, Bán online, Báo cáo phân tích, Lễ tân, Màn hình Bếp, Public API, Food App
    Given gian hàng đang sử dụng gói Keivi lite
    When người dùng truy cập hệ thống
    Then người dùng không được sử dụng các tính năng {feature_disable}

    Examples:
      | feature_disable   |
      | Nhân viên         |
      | Bán online        |
      | Báo cáo phân tích |
      | Lễ tân            |
      | Màn hình Bếp      |
      | Public API        |
      | Food App          |
  # 4. Trong Thiết lập ẩn: SMS-Email, Khuyến mại, Tích điểm

  Scenario: Không cho phép sử dụng các tính năng SMS-Email, Khuyến mại, Tích điểm
    Given gian hàng đang sử dụng gói Keivi lite
    When người dùng vào thiết lập gian hàng
    Then người dùng không nhìn thấy {disabled_setting}

    Examples:
      | disabled_setting |
      | SMS-Email        |
      | Khuyến mại       |
      | Tích điểm        |
